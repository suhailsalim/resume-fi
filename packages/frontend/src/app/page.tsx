import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Optimize Your Job Applications with AI
              </h1>
              <p className="text-xl mb-8">
                Resume-fi analyzes job descriptions, matches them to your profile,
                and helps you create tailored resumes and cover letters that stand out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Get Started
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-primary-foreground/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block bg-white p-8 rounded-lg shadow-lg">
              {/* Placeholder for image/illustration */}
              <div className="aspect-video bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">Resume Analysis Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="mb-4 text-primary text-3xl">🔍</div>
              <h3 className="text-xl font-semibold mb-3">Job-Resume Matching</h3>
              <p className="text-gray-600">
                AI-powered analysis shows you exactly how well your profile matches a job description.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="mb-4 text-primary text-3xl">📝</div>
              <h3 className="text-xl font-semibold mb-3">Tailored Documents</h3>
              <p className="text-gray-600">
                Generate customized resumes and cover letters optimized for each specific job application.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="mb-4 text-primary text-3xl">💬</div>
              <h3 className="text-xl font-semibold mb-3">AI Assistant</h3>
              <p className="text-gray-600">
                Get personalized advice and answers to your questions about specific job applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Start optimizing your job applications today with Resume-fi.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}