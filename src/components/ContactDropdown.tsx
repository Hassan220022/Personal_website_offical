import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  Calendar,
  MapPin,
  ChevronDown,
  Facebook,
  Instagram,
} from 'lucide-react';

const ContactDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactInfo = {
    phone: '+201023667216',
    email: 'Hassansherif122202@gmail.com',
    birthday: 'February 12, 2002',
    location: 'The 5th Settlement, Egypt',
    social: {
      facebook: 'hassan.sherif.754',
      instagram: 'hassan_sherif____',
    },
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        className="bg-card rounded-lg shadow-lg overflow-hidden"
        initial={false}
        animate={isOpen ? { width: 320 } : { width: 'auto' }}
        transition={{ duration: 0.3 }}
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
              transition={{ duration: 0.3 }}
              className="px-4 py-2 bg-card"
            >
              <div className="space-y-4">
                <ContactItem
                  icon={<Mail className="w-5 h-5" />}
                  label="Email"
                  value={contactInfo.email}
                  href={`mailto:${contactInfo.email}`}
                />
                <ContactItem
                  icon={<Phone className="w-5 h-5" />}
                  label="Phone"
                  value={contactInfo.phone}
                  href={`tel:${contactInfo.phone}`}
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
                <div>
                  <h4 className="text-sm font-medium mb-2">Social Media</h4>
                  <div className="flex space-x-4">
                    <a
                      href={`https://facebook.com/${contactInfo.social.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-foreground transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://instagram.com/${contactInfo.social.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-foreground transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
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

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, label, value, href }) => {
  const content = (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-primary">{icon}</span>
      <div>
        <p className="text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a
      href={href}
      className="block hover:bg-accent/50 rounded-md transition-colors p-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    <div className="p-2">{content}</div>
  );
};

export default ContactDropdown;