"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

export default function Hero2() {
  return (
      <section className="py-16 mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 sm:text-center lg:text-left">
            <h1 className="text-gray-800 font-bold text-4xl xl:text-5xl">
              Optimize your website for
              <span className="text-blue-600"> Search engine</span>
            </h1>
            <p className="text-gray-500 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
              It is a long established fact that a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum
            </p>
            <div>
              <p className="text-gray-800 py-3">Subscribe to our newsletter and we'll save your time</p>
              <form className="items-center space-y-3 sm:justify-center sm:space-x-3 sm:space-y-0 sm:flex lg:justify-start">
                <Input type="text" placeholder="Enter your email" className="text-gray-500 w-full sm:w-72" />
                <Button type="submit" className="w-full sm:w-auto">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Skeleton className="w-full max-w-[500px] h-[300px] bg-gray-200" />
          </div>
        </div>
      </section>
  )
}

