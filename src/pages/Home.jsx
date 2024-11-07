import React from "react";
import { Hero } from "../components/Hero/Hero";
import { Main } from "../components/Main/Main";
import { PageLayout } from "../layouts/PageLayout";

export const Home = () => {
  return (
    <PageLayout>
      <Hero />
      <Main />
    </PageLayout>
  );
};
