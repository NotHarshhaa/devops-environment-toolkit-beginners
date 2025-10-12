import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import ToolsGrid from "../components/ToolsGrid";
import Installation from "../components/Installation";
import LearningPath from "../components/LearningPath";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          DevOps Environment Toolkit for Beginners - One-Click Local Setup
        </title>
        <meta
          name="description"
          content="Get all essential DevOps tools installed and configured on your local machine in minutes! Perfect for beginners starting their DevOps learning journey."
        />
        <meta
          name="keywords"
          content="devops beginners, docker, kubernetes, terraform, monitoring, tools, setup, automation, local development, learning"
        />
        <meta
          property="og:title"
          content="DevOps Environment Toolkit for Beginners"
        />
        <meta
          property="og:description"
          content="One-click local setup for your DevOps learning journey"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="DevOps Environment Toolkit for Beginners"
        />
        <meta
          name="twitter:description"
          content="One-click local setup for your DevOps learning journey"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <div className="min-h-screen modern-bg dark:modern-bg transition-colors duration-300 overflow-x-hidden">
        <Header />
        <main>
          <Hero />
          <Features />
          <ToolsGrid />
          <Installation />
          <LearningPath />
        </main>
        <Footer />
      </div>
    </>
  );
}
