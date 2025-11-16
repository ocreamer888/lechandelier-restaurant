# Email Notification Improvements Plan

## Overview
This document outlines the plan to address security vulnerabilities and implement best practices for the email notification system.

---

## Priority 1: Critical Security Fixes (IMMEDIATE)

### 1.1 HTML Injection/XSS Prevention
**Issue**: User input is directly interpolated into HTML templates without escaping, creating XSS vulnerabilities.

**Affected Locations**:
- `src/lib/email.ts` lines 64, 75, 79, 83, 87, 156, 170, 174, 178, 182, 186, 190, 194

**Implementation Steps**:
1. Add `escapeHtml()` utility function at top of `email.ts`
2. Update all user input interpolations in customer email template
3. Update all user input interpolations in admin email template

**Code Changes**:
```typescript
// Add utility function
const escapeHtml = (text: string | number | null | undefined): string => {
  if (text == null) return '';
  const str = String(text);
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return str.replace(/[&<>"']/g, (m) => map[m]);
};
```

### 1.2 Email Header Injection Prevention
**Issue**: User input in email subject line can contain newline characters, enabling header injection.

**Affected Location**:
- `src/lib/email.ts` line 150 (subject line with `reservation.name`)

**Implementation Steps**:
1. Add `sanitizeHeader()` utility function
2. Apply sanitization to subject line construction

**Code Changes**:
```typescript
// Add utility function
const sanitizeHeader = (text: string): string => {
  return String(text).replace(/[\r\n]/g, '').trim();
};

// Update subject line:
subject: `Nueva Reserva - ${sanitizeHeader(reservation.name)} - ${formatDate(reservation.date)}`
```

---

## Priority 2: Essential Features (This Week)

### 2.1 Plain Text Email Versions
**Issue**: Only HTML emails are sent, reducing deliverability and accessibility.

**Implementation Steps**:
1. Create plain text version for customer confirmation email
2. Create plain text version for admin notification email
3. Add `text` field to both `resend.emails.send()` calls

**Code Structure**:
```typescript
text: `Le Chandelier - Confirmación de Reserva

Estimado/a ${reservation.name},

Gracias por elegir Le Chandelier...

Detalles de la Reserva:
- Fecha: ${formatDate(reservation.date)}
- Hora: ${formatTime(reservation.time)}
- Comensales: ${reservation.guests}

ID de Reserva: ${reservation.id}

${siteUrl}/reservations/${reservation.id}
`
```

### 2.2 Retry Logic with Exponential Backoff
**Issue**: Transient failures result in lost emails with no retry mechanism.

**Implementation Steps**:
1. Create `sendEmailWithRetry()` helper function
2. Configure retry attempts (3 tries) with exponential backoff
3. Wrap Resend API calls with retry logic

**Code Structure**:
```typescript
const sendEmailWithRetry = async (
  sendFn: () => Promise<{ error?: any }>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<{ success: boolean; error?: string }> => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const result = await sendFn();
    if (!result.error) {
      return { success: true };
    }
    
    if (attempt < maxRetries - 1) {
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  return { success: false, error: 'Failed after retries' };
};
```

### 2.3 Email Headers (Reply-To, List-Unsubscribe, Precedence)
**Issue**: Missing standard email headers reduces deliverability and user experience.

**Implementation Steps**:
1. Add `headers` object to both email sends
2. Include `Reply-To`, `List-Unsubscribe`, and `Precedence` headers

**Code Changes**:
```typescript
headers: {
  'Reply-To': 'reservaciones@lechandelier.restaurant',
  'List-Unsubscribe': `<${siteUrl}/unsubscribe>`,
  'Precedence': 'bulk',
}
```

### 2.4 Improved Error Handling
**Issue**: Errors are logged but not structured or actionable.

**Implementation Steps**:
1. Create structured error logging
2. Include reservation ID in error logs
3. Add error context for debugging

**Code Structure**:
```typescript
interface EmailError {
  type: 'customer' | 'admin';
  reservationId: string;
  error: string;
  timestamp: string;
}

const logEmailError = (type: 'customer' | 'admin', reservationId: string, error: unknown) => {
  const errorDetails: EmailError = {
    type,
    reservationId,
    error: error instanceof Error ? error.message : String(error),
    timestamp: new Date().toISOString(),
  };
  console.error('[EMAIL_ERROR]', JSON.stringify(errorDetails));
};
```

---

## Priority 3: Infrastructure Improvements (This Month)

### 3.1 Update Reservation API Route
**Issue**: Email sending in API route uses `Promise.all()` without proper await, making errors hard to track.

**Affected Location**:
- `src/app/api/reservations/route.ts` lines 137-143

**Implementation Steps**:
1. Properly await email sending
2. Log email results even if non-blocking
3. Optionally track email status in database

**Code Changes**:
```typescript
// Send confirmation emails (non-blocking but tracked)
const emailResults = await Promise.allSettled([
  sendCustomerConfirmationEmail(reservation),
  sendAdminNotificationEmail(reservation),
]);

emailResults.forEach((result, index) => {
  if (result.status === 'rejected') {
    const emailType = index === 0 ? 'customer' : 'admin';
    console.error(`Failed to send ${emailType} email:`, result.reason);
  }
});
```

### 3.2 Enhanced Email Validation
**Issue**: Basic regex email validation may allow invalid addresses.

**Affected Location**:
- `src/lib/validation.ts` line 14

**Implementation Steps**:
1. Consider using stricter email validation library
2. Add domain validation
3. Or keep current validation but document limitations

---

## Priority 4: Future Enhancements

### 4.1 Email Template Management
**Consider**: Migrate from inline HTML strings to React Email or template library
- Improves maintainability
- Better testing capabilities
- Type-safe templates

### 4.2 Rate Limiting
**Consider**: Add rate limiting per IP/email address
- Prevents abuse
- Protects against hitting Resend limits

### 4.3 Email Analytics
**Consider**: Track email delivery, opens, and clicks
- Monitor deliverability
- Identify issues early

### 4.4 Domain Verification
**Action Required**: Verify domain in Resend dashboard
- Configure SPF, DKIM, DMARC records
- Improve deliverability
- Required for production

---

## Testing Plan

### Unit Tests
- [ ] Test `escapeHtml()` with various malicious inputs
- [ ] Test `sanitizeHeader()` with newline characters
- [ ] Test retry logic with mocked failures
- [ ] Test plain text email generation

### Integration Tests
- [ ] Test full email sending flow
- [ ] Verify HTML and plain text versions are sent
- [ ] Test error handling and logging

### Manual Testing
- [ ] Send test email with XSS payload in name field
- [ ] Verify HTML is properly escaped in received email
- [ ] Test retry logic by temporarily disabling Resend API key
- [ ] Verify email headers are present in received email

---

## Implementation Order

1. **Day 1**: Security fixes (1.1, 1.2)
2. **Day 2**: Plain text versions (2.1)
3. **Day 3**: Retry logic (2.2)
4. **Day 4**: Email headers (2.3)
5. **Day 5**: Error handling improvements (2.4, 3.1)
6. **Week 2**: Testing and refinement
7. **Week 3-4**: Infrastructure improvements (3.2, 4.4)

---

## Notes

- All changes should maintain backward compatibility
- Test in development environment before production
- Monitor email logs after deployment
- Consider feature flag for retry logic during initial rollout

