import React from "react";
import { Helmet } from "react-helmet";
export default function Meta({ title, keyword, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="keyword" keyword={keyword} />
      <meta name="description" description={description} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: "TastyTrove - Home of Afforadble and durable foods ",
  description: "We offer qualtiy Foods",
  keyword: "Foods, buy quality Foods, rare ones",
};
