// --- Type Definition for a single testimonial ---
// This tells TypeScript what the shape of our testimonial object is.
interface Testimonial {
  quote: string;
  author: string;
  tagline: string;
}

// --- Testimonial Data ---
// We type our array as Testimonial[] to ensure all objects match the shape we defined.
const testimonialsData: Testimonial[] = [
  {
    quote: "The moment I entered my room and saw the frame welcome me with my name and sunset visuals, I literally gasped. Most peaceful sleep I've had in months.",
    author: "— Guest at boutique hotel pilot",
    tagline: "Genuine Compliments 🌿"
  },
  {
    quote: "Our wedding couple cried seeing their photos reimagined in dreamy AI art and playing on the wall. It was next-level personalization.",
    author: "— Events manager at luxury resort",
    tagline: "Our Loved Memories ✨"
  },
  {
    quote: "We've had multiple guests ask where they could buy it. Deckoviz has become a silent ambassador for our design and brand experience.",
    author: "— General Manager, design-forward city hotel",
    tagline: "Valuable Experiences 👍"
  }
];


// --- The Main Testimonials Component ---
// We define the component as a React Functional Component using React.FC
const GuestReactionsTestimonials: React.FC = () => {
  return (
    <div className="testimonials-section">
      {/* --- CSS Styles --- */}
      {/* It's best to move these styles to a separate .css file, */}
      {/* but for ease of use, they are included here. */}
      <style>{`
        .testimonials-section {
          background-color: #f4f0fa; /* A light lavender background like the image */
          padding: 60px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          text-align: center;
        }
        .testimonials-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #8a2be2; /* A purple/violet color for the title */
          margin-bottom: 40px;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr); /* Creates a 3-column grid */
          gap: 30px; /* Space between the cards */
          max-width: 1200px;
          margin: 0 auto;
        }
        .testimonial-card {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-between; /* Pushes tagline to the bottom */
          min-height: 250px;
        }
        .testimonial-quote {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #333;
          margin-bottom: 20px;
        }
        .testimonial-author {
          font-size: 1rem;
          font-weight: 500;
          color: #555;
          margin-bottom: 20px;
        }
        .testimonial-tagline {
          font-size: 0.9rem;
          color: #777;
          margin-top: auto; /* Pushes itself to the bottom */
        }

        /* --- Responsive Design for smaller screens --- */
        @media (max-width: 992px) {
          .testimonials-grid {
            grid-template-columns: 1fr; /* Stack cards on top of each other */
          }
          .testimonials-title {
            font-size: 2rem;
          }
        }
      `}</style>

      <h2 className="testimonials-title">Real Results: Sample Guest Reactions</h2>
      
      <div className="testimonials-grid">
        {/* We map over the data array to create a card for each testimonial */}
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <p className="testimonial-author">{testimonial.author}</p>
            </div>
            <p className="testimonial-tagline">{testimonial.tagline}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestReactionsTestimonials;