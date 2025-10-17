export const metadata = {
  title: 'Le Chandelier CMS',
  description: 'Content management for Le Chandelier restaurant',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ margin: 0, height: '100vh' }}>
      {children}
    </div>
  );
}

