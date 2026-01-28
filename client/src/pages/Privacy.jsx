import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
  const [privacyContent, setPrivacyContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the privacy policy content from the assets folder
    fetch('/assets/Privacy Policy SV Website.txt')
      .then(response => response.text())
      .then(content => {
        // Remove any problematic spans that might create empty space
        const cleanedContent = content.replace(
          /<span[^>]*background:\s*url\(data:image\/svg\+xml;base64[^>]*><\/span>/gi,
          ''
        );
        setPrivacyContent(cleanedContent);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading privacy policy:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading Privacy Policy...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="container mx-auto px-6 pt-4 pb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        
        {/* Privacy Policy Content */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-invert prose-lg max-w-none"
            style={{
              color: '#ffffff',
              lineHeight: '1.6'
            }}
          >
            {/* Render the HTML content directly */}
            <div 
              dangerouslySetInnerHTML={{ __html: privacyContent }}
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#ffffff'
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Override styles to ensure all text is white */}
      <style jsx>{`
        [data-custom-class='title'], 
        [data-custom-class='title'] *,
        [data-custom-class='heading_1'], 
        [data-custom-class='heading_1'] *,
        [data-custom-class='heading_2'], 
        [data-custom-class='heading_2'] *,
        [data-custom-class='body_text'], 
        [data-custom-class='body_text'] *,
        [data-custom-class='subtitle'], 
        [data-custom-class='subtitle'] * {
          color: #ffffff !important;
        }
        
        [data-custom-class='link'], 
        [data-custom-class='link'] * {
          color: #60a5fa !important;
        }
        
        h1, h2, h3, h4, h5, h6 {
          color: #ffffff !important;
        }
        
        p, span, div {
          color: #ffffff !important;
        }
        
        /* Remove any empty spans and logo elements */
        span[style*="background: url"] {
          display: none !important;
        }
        
        span[style*="margin: 0 auto"] {
          display: none !important;
        }
        
        /* Remove any spans with large margins */
        span[style*="3.125rem"] {
          display: none !important;
        }
        
        /* Ensure no top margins on the first elements */
        .prose > *:first-child {
          margin-top: 0 !important;
        }
      `}</style>
    </div>
  );
}