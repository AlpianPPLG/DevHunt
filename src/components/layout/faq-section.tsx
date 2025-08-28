// d:\Development\devhunt\src\components\layout\faq-section.tsx
"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQ {
  question: string
  answer: string
}

export function FAQSection() {
  const [faqs] = useState<FAQ[]>([
    {
      question: "What is DevHunt?",
      answer: "DevHunt is a community-driven platform where developers can discover, share, and vote on the best developer tools and resources. Think of it as Product Hunt specifically for developer tools."
    },
    {
      question: "How do I submit a tool?",
      answer: "To submit a tool, create an account or log in, then click on the 'Submit a Tool' button in the navigation. Fill out the required information including the tool name, description, website URL, and relevant tags. Our team reviews submissions before they go live."
    },
    {
      question: "Is DevHunt free to use?",
      answer: "Yes, DevHunt is completely free to use. You can browse tools, create an account, submit tools, and participate in discussions without any cost."
    },
    {
      question: "How are trending tools determined?",
      answer: "Trending tools are determined by a combination of factors including recent upvotes, comments, and views. We use a weighted algorithm that gives more emphasis to recent activity while still considering the tool's overall popularity."
    },
    {
      question: "Can I suggest new features for DevHunt?",
      answer: "Absolutely! We welcome feedback and suggestions. You can reach out to us through the contact form or by emailing support@devhunt.io with your ideas."
    },
    {
      question: "How can I get my tool featured on the homepage?",
      answer: "Tools are featured based on community engagement and quality. The best way to get featured is to submit a well-described tool that resonates with the developer community. Natural upvotes and engagement will help increase visibility."
    }
  ])

  return (
    <section className="py-16 bg-accent/10">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-2">Still have questions?</p>
          <a 
            href="/contact" 
            className="text-primary hover:underline font-medium"
          >
            Contact us
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQSection;