
import HeaderLogo from '@components/header-logo';
import { FileCode, LibraryBig } from 'lucide-react';

import React from "react";
import {
  DocsThemeConfig,
  Tabs,
  Tab,
  useConfig,
  Steps,
  Card,
  Cards,
  Callout,
} from "nextra-theme-docs";
import Link from "next/link";
import { useRouter } from "next/router";
// import { GeistSans } from "geist/font/sans";





export default {
  search: {
    placeholder: "Search...",
  },
  primaryHue: 143,
  primarySaturation: 40,
  toc: {
    backToTop: true
  },
  logo: <span>InfraStack AI Documentation</span>,
  docsRepositoryBase: 'https://github.com/infrastackai/site/tree/main/docs',
  project: {
    link: 'https://github.com/infrastackai/site'
  },
  footer: {
    text: (
      <span>
        {new Date().getFullYear()} {' '}
        <a href="https://infrastack.ai" target="_blank">
          InfraStack AI, Inc
        </a>
        .
      </span>
    )
  },
  logo: () => {
    return (
      <HeaderLogo />
    );
  },
  useNextSeoProps() {
    const { asPath } = useRouter();

    return {
      titleTemplate:
        asPath === "/"
          ? "InfraStack AI Docs"
          : asPath.startsWith("/blog/")
            ? "%s - InfraStack AI Blog"
            : asPath.startsWith("/docs/guides/")
              ? "%s - InfraStack AI Guides"
              : "%s - InfraStack AI",
    };
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
    titleComponent: ({ type, title, route }) => {
      // route
      // /integrations
      // /integrations/frameworks
      console.log(title)
      if (type === 'separator' && title === "Docs" && route === "") {
        return (
          <div
            className="group mb-3 flex flex-row gap-3 nx-text-primary-800 dark:nx-text-primary-600">
            <LibraryBig className="w-6 h-6 p-1 border rounded inline mr-2" />
            {title}
          </div>
        )
      }
      return title;
    },
  },
  banner: {
    key: '2.0-release',
    text: (
      <a href="https://infrastack.ai" target="_blank">
        🎉 InfraStack AI BETA is launched. Read more →
      </a>
    )
  }
}