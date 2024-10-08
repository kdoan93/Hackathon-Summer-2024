import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { SignUpButton, useUser } from "@clerk/nextjs";
import NavBar from "../app/components/NavBar/NavBar";
import Footer from "../app/components/Footer/Footer";
import "./global.css";
import { useRouter } from "next/router";

// Interface for User data
interface User {
  _id: string;
  name: string;
  email: string;
}

// Props interface for Home component
interface HomeProps {
  data: User[];
}

// Home component
const Home: React.FC<HomeProps> = () => {
  const { user, isLoaded } = useUser();
  const userId = user?.id;
  const router = useRouter();

  useEffect(() => {
    if (userId && isLoaded) {
      router.push("/dashboard");
    }
  }, [isLoaded, userId, router]);

  const logoWord = "Sustain";
  const [typeWriterText, setTypeWriterText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    // This initiates the typewriter effect for the Sustain <h1> tag
    if (index < logoWord.length) {
      let timer = setTimeout(() => {
        setTypeWriterText((prev) => prev + logoWord[index]);
        setIndex((prev) => (prev += 1));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div className="min-h-screen flex flex-col bg-comp-black text-white">
      <NavBar />

      {/* Metadata */}
      <Head>
        <title>Sustain | Nourish. Embrace. Overcome. </title>
        <link rel="icon" href="/images/sustainlogo-peach.png" />
      </Head>

      {/* Hero Section */}
      <section className="hero min-h-screen bg-gradient-to-r from-logo-orange to-comp-black flex flex-col justify-center items-center text-center">
        <div className="flex flex-row gap-2 items-center">
          <h1 className="text-3xl md:text-7xl font-bold underline">Welcome to</h1>
          <h1 className="text-5xl md:text-9xl font-bold text-logo-orange">{typeWriterText}</h1>
        </div>
        <br />
        <h2 className="text-2xl md:text-5xl font-bold text-black">Nourish. Embrace. Overcome.</h2>
        <p className="mt-4 text-lg">Unlock your health journey Today!</p>
        <div className="btn btn-lg btn-outline btn-light mt-8">
          <SignUpButton forceRedirectUrl={"/dashboard"}>Get Started</SignUpButton>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-comp-mauve text-center">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-10">
          <div className="feature-item p-6 bg-dark-brown rounded-lg shadow-lg">
            <img src="/images/meals.png" alt="Track Your Meals" className="mx-auto mb-4 h-20 w-20" />
            <h3 className="text-xl font-bold text-logo-orange">Track Your Meals</h3>
            <p className="mt-2 text-white">
              Keep a log of all your meals and track your nutritional intake effortlessly.
            </p>
          </div>
          <div className="feature-item p-6 bg-dark-brown rounded-lg shadow-lg">
            <img src="/images/goals.png" alt="Personalized Goals" className="mx-auto mb-4 h-20 w-20" />
            <h3 className="text-xl font-bold text-logo-orange">Personalized Goals</h3>
            <p className="mt-2 text-white">Set personalized goals and monitor your progress over time.</p>
          </div>
          <div className="feature-item p-6 bg-dark-brown rounded-lg shadow-lg">
            <img src="/images/mobile.png" alt="Easy to Use" className="mx-auto mb-4 h-20 w-20" />
            <h3 className="text-xl font-bold text-logo-orange">Easy to Use</h3>
            <p className="mt-2 text-white">Our user-friendly interface makes tracking your nutrition a breeze.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="py-20 bg-comp-black text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-white">Ready to Get Started?</h2>
          <p className="text-xl mt-4 text-light-brown">
            Join the other users who are already tracking their nutrition and achieving their goals!
          </p>
          <div className="btn btn-lg btn-logo-orange mt-8">
            <SignUpButton forceRedirectUrl={"/dashboard"}>Sign Up Now</SignUpButton>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-comp-mauve text-center">
        <div className="container mx-auto">
          <div className="testimonial mb-12">
            <p className="text-xl text-white">
              "This app has completely changed the way I approach my nutrition. It's so easy to use!"
            </p>
            <span className="block mt-4 text-lg font-bold text-logo-orange">- Jane Doe</span>
          </div>
          <div className="testimonial">
            <p className="text-xl text-white">
              "I love how personalized the experience is. I've already hit my goals thanks to this app."
            </p>
            <span className="block mt-4 text-lg font-bold text-logo-orange">- John Smith</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
