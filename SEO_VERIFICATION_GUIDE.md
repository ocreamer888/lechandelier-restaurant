# SEO Quick Verification Guide
## Le Chandelier Restaurant - Costa Rica

## ✅ Quick Checks

### 1. Sitemap Accessibility
Visit in browser:
- https://www.lechandelier.restaurant/sitemap.xml
- Should show all pages in both languages
- Check last modified dates

### 2. Robots.txt
Visit in browser:
- https://www.lechandelier.restaurant/robots.txt
- Should allow all major search engines
- Should reference sitemap

### 3. Meta Tags (Use Browser Inspector)
For homepage `/es` or `/en`:
- Check `<title>` tag
- Check meta description
- Check OpenGraph tags (`og:title`, `og:description`, `og:image`)
- Check Twitter Card tags
- Check canonical URL
- Check hreflang tags

### 4. Structured Data
Use Google Rich Results Test: https://search.google.com/test/rich-results

Test these URLs:
```
https://www.lechandelier.restaurant/es
https://www.lechandelier.restaurant/en
https://www.lechandelier.restaurant/es/menu
https://www.lechandelier.restaurant/en/menu
```

**Expected Schemas:**
- Restaurant (with rating)
- Organization
- FAQ Page (15 questions)
- Breadcrumb List (on sub-pages)
- Menu (on menu page)

### 5. Schema Validator
Use: https://validator.schema.org/

Paste the URL or copy the JSON-LD from page source.

**Should validate:**
- ✅ Restaurant schema
- ✅ FAQ schema
- ✅ Organization schema
- ✅ All required properties present

### 6. Mobile-Friendly Test
Use: https://search.google.com/test/mobile-friendly

**Target:** Pass on all pages

### 7. PageSpeed Insights
Use: https://pagespeed.web.dev/

**Targets:**
- Performance: 80+
- SEO: 100
- Best Practices: 90+
- Accessibility: 90+

---

## 🔍 Manual Page Checks

### Homepage (/)
- [ ] Title includes "Premier French-Swiss Restaurant in San José, Costa Rica"
- [ ] Meta description mentions Los Yoses, Costa Rica
- [ ] FAQ schema visible in source
- [ ] AI optimization content (invisible but in source)
- [ ] Keywords include "restaurante Costa Rica" or "restaurant Costa Rica"

### Menu Page (/menu)
- [ ] Title includes "Menu" and "Costa Rica"
- [ ] Menu structured data present
- [ ] Images have alt tags

### About Page (/about)
- [ ] Title includes "About Us" and restaurant name
- [ ] Breadcrumb schema

### Events Page (/events)
- [ ] Title mentions "Private Events"
- [ ] Breadcrumb schema

### Reservation Page (/reservation)
- [ ] Title includes "Reserve a Table"
- [ ] Breadcrumb schema

### Contact Page (/contact)
- [ ] Title includes "Contact & Location"
- [ ] Geographic information visible

---

## 🌐 Google Search Console Setup

### 1. Add Property
1. Go to: https://search.google.com/search-console
2. Click "Add Property"
3. Enter: `https://www.lechandelier.restaurant`
4. Choose verification method (HTML file or meta tag recommended)

### 2. Verify Ownership
- Add verification code to metadata or upload file
- Click "Verify"

### 3. Submit Sitemap
1. In Search Console → Sitemaps
2. Add: `https://www.lechandelier.restaurant/sitemap.xml`
3. Click "Submit"

### 4. Monitor
- **Coverage:** Check indexing status
- **Performance:** Track search queries
- **Enhancements:** Verify rich results

---

## 🔧 Bing Webmaster Tools Setup

### 1. Add Site
1. Go to: https://www.bing.com/webmasters
2. Click "Add Site"
3. Enter URL: `https://www.lechandelier.restaurant`
4. Import from Google Search Console (if possible)

### 2. Submit Sitemap
- Add sitemap URL
- Verify submission

### 3. Monitor
- Check indexing
- Review search performance

---

## 📊 Testing Checklist

### Week 1
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Test all pages with Rich Results Test
- [ ] Validate all schemas
- [ ] Check mobile-friendliness
- [ ] Run PageSpeed on all pages

### Week 2
- [ ] Monitor indexing status
- [ ] Check for crawl errors
- [ ] Review first impressions data
- [ ] Test voice search queries
- [ ] Check ChatGPT responses

### Month 1
- [ ] Review search console data
- [ ] Track keyword rankings
- [ ] Monitor organic traffic
- [ ] Check Google Business Profile clicks
- [ ] Analyze user behavior

---

## 🎯 Target Search Queries to Test

### Spanish (es)
Test these in Google (from Costa Rica IP if possible):
```
mejor restaurante Costa Rica
restaurante francés San José
restaurante fino Costa Rica
donde comer San José
Le Chandelier Costa Rica
restaurante Los Yoses
cocina francesa Costa Rica
restaurante elegante San José
```

### English (en)
```
best restaurant Costa Rica
French restaurant San José
fine dining Costa Rica
where to eat San José
Le Chandelier restaurant
French Swiss cuisine Costa Rica
romantic restaurant San José
```

---

## 🤖 AI Assistant Testing

### ChatGPT Queries
Ask ChatGPT:
```
"What are the best restaurants in Costa Rica?"
"Where should I eat in San José, Costa Rica?"
"Recommend a French restaurant in Costa Rica"
"Best fine dining in San José Costa Rica"
"Where to have a romantic dinner in San José"
```

### Gemini Queries
Ask Gemini:
```
"Best restaurants in San José, Costa Rica"
"French-Swiss restaurant Costa Rica"
"Where to eat for special occasion San José"
"Top rated restaurants Costa Rica"
```

### Bing Chat
Ask Bing Chat:
```
"Best restaurant in Costa Rica"
"French cuisine San José Costa Rica"
"Fine dining recommendations Costa Rica"
```

---

## 📱 Local SEO Verification

### Google Maps
1. Search "Le Chandelier Costa Rica" on Google Maps
2. Check:
   - [ ] Restaurant appears
   - [ ] Website link works
   - [ ] Phone number correct
   - [ ] Hours accurate
   - [ ] Photos present
   - [ ] Reviews visible
   - [ ] Category correct (French Restaurant)

### Google Business Profile
1. Go to: https://business.google.com
2. Find Le Chandelier listing
3. Verify:
   - [ ] Photos uploaded
   - [ ] Menu added
   - [ ] Website link: https://www.lechandelier.restaurant
   - [ ] Reservation link works
   - [ ] All info accurate

---

## 🛠 Browser Inspector Check

### On Homepage
1. Open browser DevTools (F12)
2. View page source or Elements tab
3. Look for in `<head>`:

```html
<!-- Title -->
<title>Le Chandelier — Premier French-Swiss Restaurant...</title>

<!-- Meta Description -->
<meta name="description" content="Experience Le Chandelier...">

<!-- OpenGraph -->
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:locale" content="es_CR">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">

<!-- Geographic -->
<meta name="geo.region" content="CR-SJ">
<meta name="geo.position" content="9.9293391;-84.0589315">

<!-- Canonical -->
<link rel="canonical" href="...">

<!-- hreflang -->
<link rel="alternate" hreflang="es" href="...">
<link rel="alternate" hreflang="en" href="...">
```

4. Look for in `<body>`:

```html
<!-- Structured Data (JSON-LD) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Le Chandelier",
  ...
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  ...
}
</script>
```

---

## ✅ Success Indicators

### Immediate (Week 1)
- ✅ Sitemap accessible
- ✅ All schemas validate
- ✅ Mobile-friendly test passes
- ✅ No crawl errors
- ✅ Pages indexed

### Short-term (Month 1)
- ✅ Appearing in local search results
- ✅ Rich results showing (FAQ, ratings)
- ✅ Organic traffic increasing
- ✅ Featured in "best restaurants Costa Rica"

### Medium-term (3 Months)
- ✅ Top 5 for primary keywords
- ✅ Knowledge panel appears
- ✅ ChatGPT recommends Le Chandelier
- ✅ Gemini mentions in results
- ✅ Increasing direct searches

### Long-term (6 Months)
- ✅ #1 for "French restaurant San José"
- ✅ Top 3 for "best restaurant Costa Rica"
- ✅ Consistent AI recommendations
- ✅ High local pack visibility
- ✅ Strong brand recognition in search

---

## 🔄 Ongoing Maintenance

### Weekly
- Respond to reviews
- Post on Google Business Profile
- Check for errors in Search Console

### Monthly  
- Review keyword rankings
- Update FAQ if needed
- Add new content
- Check competitor rankings
- Monitor AI recommendations

### Quarterly
- Full SEO audit
- Schema validation
- Performance review
- Content strategy update

---

**Last Updated:** November 23, 2025
**Status:** Production Ready ✅
