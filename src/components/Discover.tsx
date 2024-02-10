import * as React from 'react';
import styled from 'styled-components';

import { Card, Headline, SectionWrapper } from '@components/Global';
import BackgroundImage from '@images/DiscoverBG.jpg';
import { graphql, useStaticQuery } from 'gatsby';
import { Swiper, SwiperSlide } from 'swiper/react';

const Background = styled.section`
  margin-bottom: 10rem;
  width: 100%;
  background-image: url(${BackgroundImage});
`;

const StyledHeadline = styled(Headline)`
  padding-left: 2rem;
  padding-right: 2rem;
`;

const Events = styled(Swiper)`
  max-width: ${(props) => props.theme.maxWidth};
  overflow: hidden;
  width: 100%;
  bottom: -10rem;
`;
const SocialMedia = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: -30px;
`;
const SocialMediaSection = styled(SectionWrapper)`
  padding-top: 10px;
`;

export const Discover = () => {
  const data = useStaticQuery(
    graphql`
      {
        allContentfulEvent {
          edges {
            node {
              id
              thumbnail {
                gatsbyImageData
                title
              }
              description {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
        allContentfulSocialMedia {
          edges {
            node {
              link
              id
              icon {
                url
              }
            }
          }
        }
      }
    `
  );

  const events = data.allContentfulEvent.edges;
  const socialMedia = data.allContentfulSocialMedia.edges;

  return (
    <>
      <SectionWrapper cover id='discover'>
        <StyledHeadline centered gutterBottom>
          Discover the world of Coconaut
        </StyledHeadline>
        <Background>
          {data && (
            <Events
              breakpoints={{
                0: {
                  slidesPerView: 1.2,
                },
                900: {
                  slidesPerView: 2.4,
                },
                1200: {
                  slidesPerView: 4,
                },
              }}
            >
              {events.map(({ node: event }) => (
                <SwiperSlide>
                  <Card
                    image={event.thumbnail.gatsbyImageData}
                    alt={event.thumbnail.title}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: event.description.childMarkdownRemark.html,
                      }}
                    />
                  </Card>
                </SwiperSlide>
              ))}
            </Events>
          )}
        </Background>
      </SectionWrapper>
      <SocialMediaSection cover id='social_media'>
        <StyledHeadline centered gutterBottom>
          Follow us on
        </StyledHeadline>
        <SocialMedia>
          {socialMedia.map(({ node: social }) => (
            <a href={social.link}>
              <img src={social.icon.url} alt='' width={32} />
            </a>
          ))}
        </SocialMedia>
      </SocialMediaSection>
    </>
  );
};
