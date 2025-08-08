import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | TechPulse',
  description: 'Terms and conditions governing your use of our services.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last updated: August 8, 2024</p>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using our website and services, you agree to be bound by these Terms of Service. 
          If you do not agree to these terms, please do not use our services.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
        <p className="mb-4">
          TechPulse provides a platform for sharing and discovering technology-related content, including 
          articles, tutorials, and resources. We reserve the right to modify or discontinue our services 
          at any time without notice.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
        <p className="mb-4">To access certain features, you may be required to create an account. You agree to:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Provide accurate and complete information</li>
          <li>Maintain the security of your account credentials</li>
          <li>Be responsible for all activities that occur under your account</li>
          <li>Notify us immediately of any unauthorized use of your account</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">4. User Content</h2>
        <p className="mb-4">
          By submitting content to our platform, you grant us a non-exclusive, worldwide, royalty-free 
          license to use, reproduce, modify, and display such content. You represent and warrant that 
          you own or have the necessary rights to the content you submit.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">5. Prohibited Conduct</h2>
        <p className="mb-4">You agree not to:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Violate any laws or regulations</li>
          <li>Infringe on the intellectual property rights of others</li>
          <li>Transmit any harmful or malicious code</li>
          <li>Harass, abuse, or harm others</li>
          <li>Impersonate any person or entity</li>
          <li>Interfere with the proper functioning of our services</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">6. Disclaimer of Warranties</h2>
        <p className="mb-4">
          Our services are provided "as is" and "as available" without any warranties of any kind, 
          either express or implied. We do not guarantee that our services will be uninterrupted, 
          secure, or error-free.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
        <p className="mb-4">
          To the maximum extent permitted by law, TechPulse shall not be liable for any indirect, 
          incidental, special, consequential, or punitive damages, or any loss of profits or revenues, 
          whether incurred directly or indirectly.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these terms at any time. We will provide notice of 
          significant changes through our website or by email. Your continued use of our services 
          after such changes constitutes your acceptance of the new terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us at 
          <a href="mailto:legal@techpulse.com" className="text-primary hover:underline ml-1">
            legal@techpulse.com
          </a>.
        </p>
      </section>
    </div>
  );
}
