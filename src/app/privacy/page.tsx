import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | TechPulse',
  description: 'Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: August 8, 2024</p>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We collect information that you provide directly to us, such as when you create an account, 
          subscribe to our newsletter, or contact us. This may include:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Your name and email address</li>
          <li>Account preferences and settings</li>
          <li>Content you submit or post on our platform</li>
          <li>Communications with us</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Provide, maintain, and improve our services</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Send you technical notices, updates, and support messages</li>
          <li>Monitor and analyze trends, usage, and activities</li>
          <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
        <p className="mb-4">
          We do not share your personal information with third parties except as described in this Privacy Policy.
          We may share information with:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Service providers who perform services on our behalf</li>
          <li>Law enforcement or other government officials, in response to a verified request</li>
          <li>Other parties in connection with a company transaction</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">4. Your Choices</h2>
        <p className="mb-4">
          You have several choices regarding the information we collect and how it's used:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Update your account information through your profile settings</li>
          <li>Opt-out of receiving promotional communications</li>
          <li>Request deletion of your account and personal data</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at 
          <a href="mailto:privacy@zemenay.com" className="text-primary hover:underline ml-1">
            privacy@techpulse.com
          </a>.
        </p>
      </section>
    </div>
  );
}
