import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Calendar, MapPin, ChevronDown, Facebook, Instagram } from 'lucide-react';

const ContactDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactInfo = {
    phone: '+201023667216',
    email: 'Hassansherif122202@gmail.com',
    birthday: 'February 12, 2002',
    location: 'The 5th Settlement, Egypt',
    social: {
      facebook: 'hassan.sherif.754',
      instagram: 'hassan_sherif____'
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        className="bg-card rounded-lg shadow-lg overflow-hidden"
        initial={false}
        animate={isOpen ? { width: 320 } : { width: 'auto' }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 flex items-center gap-2 text-left hover:bg-accent/50 transition-colors"
          aria-expanded={isOpen}
        >
          <Phone className="w-5 h-5 text-primary" />
          <span className="font-medium">Contact Details</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="ml-auto"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-border"
            >
              <div className="p-4 space-y-4">
                <ContactItem
                  icon={<Phone className="w-5 h-5" />}
                  label="Phone"
                  value={contactInfo.phone}
                  href={`tel:${contactInfo.phone}`}
                />
                <ContactItem
                  icon={<Mail className="w-5 h-5" />}
                  label="Email"
                  value={contactInfo.email}
                  href={`mailto:${contactInfo.email}`}
                />
                <ContactItem
                  icon={<Calendar className="w-5 h-5" />}
                  label="Birthday"
                  value={contactInfo.birthday}
                />
                <ContactItem
                  icon={<MapPin className="w-5 h-5" />}
                  label="Location"
                  value={contactInfo.location}
                />
                
                <div className="pt-2 border-t border-border">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    🔗 Social Media
                  </h4>
                  <div className="space-y-2">
                    <SocialLink
                      icon={<Facebook className="w-4 h-4" />}
                      platform="Facebook"
                      username={contactInfo.social.facebook}
                      href={`https://facebook.com/${contactInfo.social.facebook}`}
                    />
                    <SocialLink
                      icon={<Instagram className="w-4 h-4" />}
                      platform="Instagram"
                      username={contactInfo.social.instagram}
                      href={`https://instagram.com/${contactInfo.social.instagram}`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const ContactItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}> = ({ icon, label, value, href }) => {
  const content = (
    <div className="flex items-start gap-3 text-sm">
      <span className="text-primary mt-1">{icon}</span>
      <div>
        <p className="text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block hover:bg-accent/50 rounded-md transition-colors p-2 -mx-2"
      >
        {content}
      </a>
    );
  }

  return <div className="p-2 -mx-2">{content}</div>;
};

const SocialLink: React.FC<{
  icon: React.ReactNode;
  platform: string;
  username: string;
  href: string;
}> = ({ icon, platform, username, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-sm hover:bg-accent/50 rounded-md transition-colors p-2 -mx-2"
  >
    <span className="text-primary">{icon}</span>
    <span className="text-muted-foreground">{platform}:</span>
    <span className="font-medium">{username}</span>
  </a>
);

export default ContactDropdown;