// src/components/LandingPage.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import giftImage from '../assets/set-up-gifts.jpg';
import shoppingBagsImage from '../assets/shopping-bags.jpg';
import giftBoxImage from '../assets/BlueGiftBox.jpg';
import setUpGiftsImage from '../assets/GiftShopping.jpg';

const Container = styled.div`
  font-family: Arial, sans-serif;
  color: white;
  background-color: #451952;
`;

const Section = styled.section`
  padding: 50px;
  text-align: center;
  background-size: cover;
  background-position: center;
  position: relative; /* Set to relative to position children absolutely */
  padding: 50px;
  text-align: center;
  min-height: 600px; /* Ensure section height is set */
`;

const BackgroundSection = styled(Section)`
  background-image: url(${giftImage});
  min-height: 600px; /* Increase the height of the background section*/
  background-size: cover; /* Ensures the image covers the section */
  background-position: center; /* Centers the background image */
  background-repeat: no-repeat; /* Prevents repeating the image */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #451952
`;

const ImageSection = styled(Section)`
  background-image: url(${shoppingBagsImage});
  background-size: cover; /* Ensures the image covers the section */
  background-position: center; /* Centers the background image */
  background-repeat: no-repeat; /* Prevents repeating the image */
  color: #662549
`;

const CombinedSection = styled(Section)`
  background-color: #AE445A; /* Choose a background color or image if needed */
  color: white; /* Ensure text is readable on the background */
  padding: 40px; /* Adjust padding for the combined section */
  text-align: center;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const SubHeading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #AE445A;
  text-decoration: none;
  border-radius: 5px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
`;

const LandingPage = () => {
  return (
    <Container>
      <BackgroundSection>
        <Heading>Find The Perfect Gift in Minutes</Heading>
        <Paragraph>Our gift recommendation engine helps you quickly discover gifts tailored to each recipient.</Paragraph>
        <Button to="/homepage">Start Browsing</Button>
      </BackgroundSection>
      <ImageSection>
        <SubHeading>Online Shopping Reformers</SubHeading>
        <Paragraph>The Gift Shop is reforming the world of online shopping by curating an ultimate gift selection across categories, optimizing user journeys with intuitive navigation, seamless checkout and quick delivery.</Paragraph>
        <Image src={shoppingBagsImage} alt=" Gift Bags" />
      </ImageSection>
      <CombinedSection>
        <Heading>User Experience</Heading>
        <Paragraph>With the mission to offer unparalleled online shopping experience, The Gift Shop invests heavily in UX research and design.</Paragraph>
        <Heading>Care and Transparency</Heading>
        <Paragraph>The Gift Shop cares deeply about ethical and transparent sourcing, production, and delivery of products.</Paragraph>
        <Heading>Our Promise Centers around Value to Customers</Heading>
        <Paragraph>Our gift shop, powered by cutting-edge technology, offers an innovative shopping experience that combines convenience and quality to delight every customer.</Paragraph>
      </CombinedSection>
      <Section>
        <TextContainer>
          <Heading>Unlock a World of Innovation and Efficiency</Heading>
          <Paragraph>Our gift shop, powered by cutting-edge technology, offers an innovative shopping experience that combines convenience and quality to delight every customer.</Paragraph>
          <Button to="/homepage">Shop with Us Today</Button>
        </TextContainer>
        <ImageContainer>
          <Image src={giftBoxImage} alt="Gift Box" />
        </ImageContainer>
      </Section>
      <Section>
        <ImageContainer>
          <Image src={setUpGiftsImage} alt="Set Up Gifts" />
        </ImageContainer>
        <TextContainer>
          <SubHeading>Start Gift Shopping Innovations with our Transformative Online Platform</SubHeading>
          <Button to="/homepage">Shop Gifts Now</Button>
        </TextContainer>
      </Section>
    </Container>
  );
};

export default LandingPage;