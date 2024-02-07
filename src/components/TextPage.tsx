import * as React from 'react';
import { graphql } from 'gatsby';
import { Layout, SectionWrapper } from '@components/Global';
import styled from 'styled-components';

const StyledMarkdownContent = styled.div`
  h1 {
    padding: 2rem 0;
  }
  h2 {
    padding: 2rem 0;
    font-size: 2.4rem;
    line-height: 3rem;
  }
  li,
  p {
    font-family: 'montserrat';
    font-size: 1.4rem;
    line-height: 2rem;
    padding: 1rem 0;
  }
  ul {
    padding-left: 2rem;
    list-style: disc;
  }
`;

const TextPage = ({ data }) => {
  const page = data.contentfulPage;

  return (
    <Layout title={page.title} description={''}>
      <SectionWrapper padded>
        <StyledMarkdownContent
          className='textPage'
          dangerouslySetInnerHTML={{
            __html:
              page.childContentfulPageTextTextNode.childMarkdownRemark.html,
          }}
        />
      </SectionWrapper>
    </Layout>
  );
};

export const pageQuery = graphql`
  query textPageQuery($id: String) {
    contentfulPage(id: { eq: $id }) {
      title
      slug
      childContentfulPageTextTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;

export default TextPage;
