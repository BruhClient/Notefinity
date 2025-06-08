import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Button,
} from '@react-email/components';
import * as React from 'react';

type Props = {
  verificationUrl: string;
};

export const VerificationEmail = ({ verificationUrl }: Props) => (
  <Html>
    <Head />
    <Body style={{ fontFamily: 'Arial', backgroundColor: '#f9f9f9', padding: '20px' }}>
      <Container style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Verify your email address</Text>
        <Text>Click the button below to verify your email:</Text>
        <Button
          href={verificationUrl}
          style={{
            backgroundColor: '#0070f3',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            display: 'inline-block',
            fontWeight: 'bold',
          }}
        >
          Verify Email
        </Button>
        <Text>If you did not request this, you can safely ignore it.</Text>
      </Container>
    </Body>
  </Html>
);

  