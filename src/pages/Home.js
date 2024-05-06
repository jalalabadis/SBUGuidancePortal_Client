import React from 'react'
import Logo from "../components/Logo";
import data from "../data/supports/overview.json";
import { Anchor, Box, Heading, Section, Text } from "../components/elements";
import { Container } from "react-bootstrap";

function Home() {
  return (
    <Box className="mc-overview">
    <Section className="mc-overview-banner">
        <Container>
            <Logo href="/" src={ data?.banner.logo } alt="logo" name="hotash" className="lg" />
            <Heading as="h1">{ data?.banner.title }</Heading>
            <Text>{ data?.banner.descrip }</Text>

            <Anchor 
                href="/login" 
                icon="launch" 
                text="Let's Get START" 
                rel="noopener noreferrer"
                className="mc-btn primary"
            />
        </Container>
    </Section>

    <Section className="mc-overview-footer">
        <Heading as="h2">Do you want to inquiry about hotash template?</Heading>
        <Text>Hotash | © Copyrights by <Text as="span">Mironcoder</Text></Text>
    </Section>
</Box>
  )
}

export default Home