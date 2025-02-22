import { useEffect } from "react";

const translateStyles = `
  /* Hide Google Translate elements completely */
  .VIpgJd-ZVi9od-ORHb-OEVmcd,
  .skiptranslate iframe,
  .goog-te-banner-frame,
  .VIpgJd-ZVi9od-l4eHX-hSRGPd {
    display: none !important;
  }

  /* Remove border and fix body position */
  body {
    top: 0 !important;
    position: static !important;
  }

  /* Remove any residual borders */
  .goog-te-menu-value span {
    border: none !important;
    border-left: none !important;
  }

  /* Rest of your existing styles */
  .goog-te-gadget {
    color: var(--navbar-text) !important;
    font-family: inherit !important;
  }
  .goog-te-gadget-simple {
    background-color: var(--btn-secondary-bg) !important;
    border: 1px solid var(--border) !important;
    padding: 8px !important;
    border-radius: 8px !important;
    font-size: 14px !important;
    display: flex !important;
    align-items: center !important;
    cursor: pointer !important;
  }
  .goog-te-gadget-simple img {
    display: none !important;
  }
  .goog-te-menu-value {
    color: var(--navbar-text) !important;
    margin: 0 !important;
    text-transform: capitalize !important;
  }
  .goog-te-menu-value span {
    color: var(--navbar-text) !important;
    text-transform: capitalize !important;
  }
  .goog-te-menu-value span:last-child {
    display: none !important;
  }
  
  /* Style the dropdown */
  .goog-te-menu2 {
    background-color: var(--background) !important;
    border: 1px solid var(--border) !important;
    border-radius: 8px !important;
    padding: 8px !important;
  }
  .goog-te-menu2-item div {
    color: var(--text) !important;
    padding: 8px !important;
  }
  .goog-te-menu2-item:hover {
    background-color: var(--btn-secondary-hover) !important;
  }
`;

export default function GTranslate() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = translateStyles;
    document.head.appendChild(style);

    const meta = document.createElement("meta");
    meta.name = "google";
    meta.content = "notranslate";
    document.head.appendChild(meta);

    const initializeTranslate = () => {
      if (!window.google || !window.google.translate) {
        setTimeout(initializeTranslate, 100);
        return;
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "hi,mr,en,gu,kn,ml,pa,ta,te,ur",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );

      const frame = document.querySelector(".goog-te-banner-frame");
      if (frame) frame.remove();
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
      window.googleTranslateElementInit = initializeTranslate;
    }

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(meta);
    };
  }, []);

  return <div id="google_translate_element" />;
}
