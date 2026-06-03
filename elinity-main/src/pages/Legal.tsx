import React, { useEffect } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 }
  }
};

const LegalPage: React.FC = () => {
  useEffect(() => {
    document.title = "Elinity | Legal";
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#030014] to-[#0a0a23] text-white py-20 px-6 md:px-16">
      <div className="pt-24"></div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{
          border: "1px solid rgba(59, 130, 246, 0.2)", // Subtle Blue border
          padding: "40px",
          borderRadius: "24px",
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(12px)",
          width: "100%",
          margin: "0px auto"
        }}
        className="max-w-4xl mx-auto leading-8 shadow-2xl shadow-blue-900/10"
      >
        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-center"
        >
          Legal Information for{" "}
          <span className="text-blue-500">Elinity</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-center text-gray-400 mb-12"
        >
          Last Updated: 23rd Feb., 2026
        </motion.p>

        {/* TERMS */}
        <AnimatedSection title="Terms of Service">
          <p>
            By accessing or using Elinity, you agree to be bound by these Terms
            of Service. If you disagree with any part of the terms, you may not
            access the service.
          </p>

          <SubTitle>1.1 Eligibility</SubTitle>
          <p>
            You must be at least 18 years old to use Elinity. By using the
            service, you represent and warrant that you have the right,
            authority, and capacity to enter into this agreement and to abide by
            all of the terms and conditions.
          </p>

          <SubTitle>1.2 Account Creation</SubTitle>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to accept responsibility for all
            activities that occur under your account.
          </p>

          <SubTitle>1.3 User Conduct</SubTitle>
          <p>You agree not to:</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-300">
            <li>Use the service for any unlawful purpose</li>
            <li>Impersonate any person or entity</li>
            <li>Harass, bully, or stalk any other user</li>
            <li>Post false or misleading information</li>
            <li>Attempt to gain unauthorized access</li>
          </ul>

          <SubTitle>1.4 Intellectual Property</SubTitle>
          <p>
            The Elinity service and its original content, features, and functionality are owned by Elinity and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>

          <SubTitle>1.5 Termination</SubTitle>
          <p>
             We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
        </AnimatedSection>

        <AnimatedSection title="Privacy Policy">
          <p>
            Our Privacy Policy, available at <a href="https://elinity.ai/privacypolicy" target="_blank" rel="noopener noreferrer"
            className="underline text-blue-400 hover:text-blue-300 transition-colors">here</a>, describes how we collect, use, and share information about you when you use our services. By using Elinity, you agree to our collection, use, and sharing of information as described in the Privacy Policy.
          </p>
        </AnimatedSection>

        <AnimatedSection title="Copyright Policy">
          <SubTitle>3.1 DMCA Compliance</SubTitle>
          <p>
              We respect the intellectual property rights of others and expect users of our service to do the same. We will respond to notices of alleged copyright infringement that comply with applicable law and are properly provided to us.
          </p>

          <SubTitle>3.2 Copyright Notification</SubTitle>
          <p>If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please provide our copyright agent with the following information:</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-300">
            <li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf</li>
            <li>Identification of the copyrighted work claimed to have been infringed</li>
            <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity</li>
            <li>Contact information for the complaining party</li>
            <li>A statement that the complaining party has a good faith belief that use of the material is not authorized by the copyright owner</li>
            <li>A statement that the information in the notification is accurate and, under penalty of perjury, that the complaining party is authorized to act on behalf of the copyright owner</li>
          </ul>
        </AnimatedSection>

        <AnimatedSection title="Disclaimer of Warranties">
          <p>
Elinity is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not guarantee the accuracy, completeness, or usefulness of any information on the service.
          </p>
        </AnimatedSection>

        <AnimatedSection title="Limitation of Liability">
          <p>
In no event shall Elinity, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>
        </AnimatedSection>

        <AnimatedSection title="Indemnification">
          <p>
You agree to defend, indemnify and hold harmless Elinity and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of <br></br> a) your use and access of the service, or <br></br>b) a breach of these Terms.
          </p>
        </AnimatedSection>

        <AnimatedSection title="Governing Law">
          <p>These Terms shall be governed and construed in accordance with the laws of [Insert Jurisdiction], without regard to its conflict of law provisions.
          </p>
        </AnimatedSection>

        <AnimatedSection title="Changes to Terms">
          <p>
We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.

          </p>
        </AnimatedSection>

        <AnimatedSection title="Contact Information">
          If you have any questions about these Terms, please contact us at:

          <p className="mt-4"><span className="text-blue-400 font-medium">Email:</span> legal@elinity.com</p>
          <p><span className="text-blue-400 font-medium">Address:</span> 128 City Road, London, EC1V 2NX</p>
        </AnimatedSection>

        <AnimatedSection title="Dispute Resolution">
          <SubTitle>10.1 Arbitration Agreement</SubTitle>
          <p>
You and Elinity agree that any dispute, claim or controversy arising out of or relating to these Terms or the breach, termination, enforcement, interpretation or validity thereof or the use of the Service (collectively, "Disputes") will be settled by binding arbitration, except that each party retains the right to seek injunctive or other equitable relief in a court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation or violation of a party's copyrights, trademarks, trade secrets, patents or other intellectual property rights.

          </p>

          <SubTitle>10.2 Class Action Waiver</SubTitle>
          <p>
You agree that any arbitration will be conducted on an individual basis and not in a class, consolidated or representative action.
          </p>
        </AnimatedSection>

        <AnimatedSection title="Severability">
          <p>
            If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
          </p>
        </AnimatedSection>

        <AnimatedSection title="Entire Agreement">
          <p>
            These Terms, our Privacy Policy, and any other legal notices published by us on the Service, shall constitute the entire agreement between you and Elinity concerning the Service.
          </p>
          <p className="pt-6 font-semibold text-blue-100">
            By using Elinity, you acknowledge that you have read and understood these legal terms and agree to be bound by them.
          </p>
        </AnimatedSection>
      </motion.div>
    </div>
  );
};

export default LegalPage;

/* Animated Section wrapper */
const AnimatedSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-60px" }}
    className="mb-10"
  >
    {/* Updated Title Color to Electric Indigo */}
    <h2 className="text-2xl font-bold text-[#7B3FE4] mb-3">{title}</h2>
    <div className="text-gray-200 space-y-3">{children}</div>
  </motion.div>
);

const SubTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-lg font-semibold text-white mt-4 border-l-2 border-blue-500 pl-3">{children}</h3>
);