import why1 from '../assets/why1.png';
import why2 from '../assets/why2.png';
import crmlogo1 from '../assets/crmlogo1.png';
import crmlogo2 from '../assets/crmlogo2.png';
import crmlogo3 from '../assets/crmlogo3.png';
import crmlogo4 from '../assets/crmlogo4.png';
import crmlogo5 from '../assets/crmlogo5.png';
import crmlogo6 from '../assets/crmlogo6.png';
import aboutus1 from '../assets/aboutus1.jpg';
import aboutus2 from '../assets/aboutus2.jpg';
import aboutus3 from '../assets/aboutus3.jpg';
import innovation from '../assets/innovation.svg';
import user from '../assets/user.svg';
import integrity from '../assets/integrity.svg';
import collaboration from '../assets/collaboration.svg';

const AboutUs = () => {
  const logos = [crmlogo1, crmlogo2, crmlogo3, crmlogo4, crmlogo5, crmlogo6];
  const stats = [
    { value: '10K', label: 'Happy Customers' },
    { value: '10+', label: 'Years of Experience' },
    { value: '50K', label: 'Total Views' },
    { value: '99%', label: 'Customer Satisfaction' },
  ];
  const values = [
    { icon: innovation, title: 'Innovation', description: 'Innovation is at the core of our ethos. We constantly seek fresh and creative solutions to empower your online journey. We believe that staying at the forefront of technology and design trends is essential to help you stand out in the digital world.' },
    { icon: user, title: 'User-Centricity', description: 'Our users are at the heart of everything we do. We prioritize your needs and experiences, ensuring that our solutions are intuitive, user-friendly, and tailored to meet your goals. We believe in putting our users first.' },
    { icon: integrity, title: 'Integrity', description: 'We uphold the highest standards of integrity in all of our actions. We are committed to being transparent and honest with our clients, partners, and employees, building relationships based on trust and mutual respect.' },
    { icon: collaboration, title: 'Collaboration', description: 'We believe in the power of collaboration. We work closely with our clients to understand their vision and goals, and we foster a team environment where diverse perspectives can come together to create exceptional results.' },
  ];

  return (
    <div className="bg-white font-sans mt-10">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl font-medium text-gray-800 mb-4">Embrace the Zestful Difference</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">At Zestful, we're not just another web design solution; we're your creative partner in the digital world. Our passion for innovation and user-centric design drives us to provide you with the tools you need to make your online presence truly shine.</p>
      </section>

      {/* Image Gallery */}
      <section className="px-4 mb-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <img src={aboutus1} alt="Office building" className="rounded-lg shadow-lg w-full h-full object-cover" />
          <img src={aboutus2} alt="Team meeting" className="rounded-lg shadow-lg w-full h-full object-cover md:col-span-2" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <h2 className="text-2xl font-medium text-orange-500">{stat.value}</h2>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Service Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-medium text-gray-800 mb-6">A Service that will elevate your Digital Business</h2>
            <p className="text-gray-600 mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-2">
                  <img src={why1} alt="" className="w-12 h-12 mr-4" />
                  <h3 className="text-2xl font-normal">Enhanced Data Analysis</h3>
                </div>
                <p className="text-gray-600 ml-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <img src={why2} alt="" className="w-12 h-12 mr-4" />
                  <h3 className="text-2xl font-normal">SEO Optimization</h3>
                </div>
                <p className="text-gray-600 ml-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
              </div>
            </div>
          </div>
          <div>
            <img src={aboutus3} alt="Dashboard preview" className="rounded-lg shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-medium text-gray-800 mb-4">Our Company Values</h2>
          <p className="text-gray-600 mb-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.</p>
        </div>
        <div className="container mx-auto grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center">
              <img src={value.icon} alt="" className="w-16 h-16 mx-auto mb-6" />
              <h3 className="text-2xl font-normal mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-medium text-gray-800 mb-4">Top Brands that worked with Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
        <div className="container mx-auto flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {logos.map((logo, index) => (
            <img key={index} src={logo} alt={`Brand logo ${index + 1}`} className="h-8 object-contain" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

