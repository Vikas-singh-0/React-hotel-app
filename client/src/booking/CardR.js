import { Card,Button } from "react-bootstrap"


import React from 'react'

export default function CardR({h}) {
  // console.log(h);
  return (
        <Card>
        <Card.Header>{h.title}</Card.Header>
        <Card.Body>
          <Card.Title>{h.content}</Card.Title>
          <Card.Text>
            {h.from} {h.to}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
  )
}
