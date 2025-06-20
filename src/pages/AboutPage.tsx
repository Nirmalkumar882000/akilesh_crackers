import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { Truck, Clock, Star, Shield, Users, Award, Sparkles, Target, Zap, MapPin } from 'lucide-react';

const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.div ref={ref} style={animation}>
      {children}
    </animated.div>
  );
};

const AboutPage: React.FC = () => {
  const [heroRef, heroInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const heroAnimation = useSpring({
    opacity: heroInView ? 1 : 0,
    transform: heroInView ? 'scale(1)' : 'scale(0.9)',
    config: { tension: 300, friction: 20 }
  });

  const features = [
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Sourcing the finest materials for exceptional performance since 2010'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Rigorous testing for maximum safety standards and certifications'
    },
    {
      icon: Truck,
      title: 'Swift Delivery',
      description: 'Fast and reliable shipping across Sivakasi and Tamil Nadu'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance for retail and wholesale'
    },
    {
      icon: Users,
      title: 'Wholesale Excellence',
      description: 'Special pricing and bulk orders for dealers and retailers'
    },
    {
      icon: Award,
      title: 'Certified Products',
      description: 'All products meet industry standards and safety regulations'
    },
    {
      icon: Target,
      title: 'Custom Orders',
      description: 'Tailored solutions for weddings, festivals, and special events'
    },
    {
      icon: MapPin,
      title: 'Sivakasi Heritage',
      description: 'Proudly serving from the fireworks capital of India'
    }
  ];

  const milestones = [
    {
      year: '2010',
      title: 'Foundation in Sivakasi',
      description: 'Started as a small family-owned shop in the heart of Sivakasi'
    },
    {
      year: '2015',
      title: 'Retail Expansion',
      description: 'Became the most trusted retail cracker shop in Sivakasi'
    },
    {
      year: '2018',
      title: 'Wholesale Division',
      description: 'Launched wholesale operations serving dealers across Tamil Nadu'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched online platform during pandemic to serve customers safely'
    },
    {
      year: '2025',
      title: 'Market Leader',
      description: 'Recognized as Sivakasi\'s most popular cracker shop with retail & wholesale excellence'
    }
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <animated.section 
        ref={heroRef}
        style={heroAnimation}
        className="relative h-[500px] overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg"
            alt="Sri Akilesh Agency - Sivakasi's Premier Cracker Shop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
        </div>
        
        <div className="container-custom h-full flex items-center relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center mb-4">
              <Sparkles className="h-8 w-8 text-primary-500 mr-3" />
              <h1 className="text-5xl font-bold text-white">Sri Akilesh Agency</h1>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary-400 mb-2">
                Sivakasi's Most Popular Cracker Shop
              </h2>
              <p className="text-xl text-white/90">
                Illuminating celebrations since 2010 with premium quality firecrackers, 
                serving both retail and wholesale customers across Tamil Nadu.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn btn-primary text-lg px-8 py-3">
                Explore Products
              </Link>
              <Link to="/price-list" className="btn bg-white/10 text-white hover:bg-white/20 text-lg px-8 py-3">
                View Price List
              </Link>
              <Link to="/contact" className="btn bg-primary-600/20 text-white hover:bg-primary-600/30 text-lg px-8 py-3">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </animated.section>

      {/* Our Legacy Section */}
      <AnimatedSection>
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Our Legacy of Excellence</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    <span className="font-bold text-primary-600">Sri Akilesh Agency</span> was founded in 2010 in the heart of 
                    <span className="font-semibold"> Sivakasi, Tamil Nadu</span> - the fireworks capital of India. 
                    What started as a modest family venture has blossomed into the region's most popular and trusted cracker destination.
                  </p>
                  <p>
                    Our journey has been marked by an unwavering commitment to quality, safety, and customer satisfaction. 
                    We've built lasting relationships with suppliers and customers alike, ensuring only the finest products 
                    reach your celebrations. From small retail purchases to large wholesale orders, we serve every customer with equal dedication.
                  </p>
                  <p>
                    Today, we proudly serve both <span className="font-semibold text-primary-600">retail and wholesale customers</span>, 
                    offering an extensive range of firecrackers that meet the highest safety standards while delivering spectacular 
                    visual displays. Our reputation as Sivakasi's most popular cracker shop is built on 15 years of trust, quality, and service excellence.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg"
                  alt="Sri Akilesh Agency - Fireworks display"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary-500 text-white p-6 rounded-lg shadow-lg">
                  <p className="text-3xl font-bold">15+</p>
                  <p className="text-sm">Years of Excellence</p>
                  <p className="text-xs mt-1">in Sivakasi</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Features Grid */}
      <AnimatedSection>
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Choose Sri Akilesh Agency?</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
                Experience the perfect blend of quality, safety, and service that has made us 
                Sivakasi's most popular cracker shop for both retail and wholesale customers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="card p-6 hover:scale-105 transition-transform duration-300">
                  <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Milestones */}
      <AnimatedSection>
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Journey to Success</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                A timeline of our growth from a small Sivakasi shop to the most popular cracker destination 
                serving retail and wholesale customers across Tamil Nadu.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200 dark:bg-primary-800"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div 
                    key={index}
                    className={`flex items-center ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <div className="card p-6 hover:scale-105 transition-transform duration-300">
                        <span className="text-primary-500 font-bold text-2xl mb-2 block">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Call to Action */}
      <AnimatedSection>
        <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto text-white">
              <h2 className="text-4xl font-bold mb-6">Ready to Light Up Your Celebration?</h2>
              <p className="text-xl mb-8">
                Join thousands of satisfied customers who trust Sri Akilesh Agency for their celebration needs.
                Experience the difference of premium quality firecrackers backed by 15 years of expertise from 
                Sivakasi's most popular cracker shop.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">🏪 Retail Sales</h3>
                  <p className="text-sm">Perfect for families and individual celebrations</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">📦 Wholesale Supply</h3>
                  <p className="text-sm">Bulk orders for dealers and event organizers</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">🚚 Sivakasi Direct</h3>
                  <p className="text-sm">Authentic products from the fireworks capital</p>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/products" className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
                  Shop Retail
                </Link>
                <Link to="/price-list" className="btn bg-primary-800 text-white hover:bg-primary-900 text-lg px-8 py-3">
                  Wholesale Prices
                </Link>
                <Link to="/contact" className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default AboutPage;