import React, { useEffect } from 'react';
import { CLINIC } from '../constants/clinic';

const SEO = ({ title, description, image, type = 'website' }) => {
  const pageTitle = title
    ? `${title} | ${CLINIC.name}`
    : `${CLINIC.name} | Ancient Wisdom. Modern Healing.`;

  const pageDescription =
    description ||
    `Official portal for Tamil Siddha Clinic in Viluppuram by ${CLINIC.doctor}, ${CLINIC.designation}. Non-surgical care for kidney stones, uterine fibroids, chronic pain, and skin disorders.`;

  const ogImage = image || 'https://tamilsiddhaclinic.com/og-banner.jpg';

  useEffect(() => {
    // Set title
    document.title = pageTitle;

    // Helper to set meta tags
    const setMetaTag = (nameAttr, nameVal, content) => {
      let element = document.querySelector(`meta[${nameAttr}="${nameVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, nameVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', pageDescription);
    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', pageDescription);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:site_name', CLINIC.name);
  }, [pageTitle, pageDescription, ogImage, type]);

  return null;
};

export default SEO;
