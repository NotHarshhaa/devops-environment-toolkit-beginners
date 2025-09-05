import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import ToolsGrid from '../components/ToolsGrid'
import Installation from '../components/Installation'
import LearningPath from '../components/LearningPath'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>DevOps Environment Toolkit - One-Click Setup for Your DevOps Journey</title>
        <meta name="description" content="Get all essential DevOps tools installed and configured in minutes! Docker, Kubernetes, Terraform, monitoring tools, and more." />
        <meta name="keywords" content="devops, docker, kubernetes, terraform, monitoring, tools, setup, automation" />
        <meta property="og:title" content="DevOps Environment Toolkit" />
        <meta property="og:description" content="One-click setup for your DevOps journey" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DevOps Environment Toolkit" />
        <meta name="twitter:description" content="One-click setup for your DevOps journey" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      
      <div className="min-h-screen retro-bg dark:retro-bg light:bg-retro-light-bg transition-colors duration-300 overflow-x-hidden">
        <Header />
        <div>
          <Hero />
          <Features />
          <ToolsGrid />
          <Installation />
          <LearningPath />
          <Footer />
        </div>
      </div>
    </>
  )
}
