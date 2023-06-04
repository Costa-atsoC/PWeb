import React, { useState } from 'react'
import { Col, Row, Container } from 'reactstrap'

import "./Profile.css"

type Props = {
  user : Object | any;
}


const Profile: React.FC<Props> = ({ user }) => {
  const [username, setUsername] = useState<string>(user.username);
  // const [password, setPassword] = useState<string>(user.password);
  const [email, setEmail] = useState<string>(user.email);
  // const [photo, setPhoto] = useState<string>(user.photo);
  // const [coffe, setCoffe] = useState<boolean>(user.coffe);
  // const [perfil, setPerfil] = useState<string>(user.perfil);

  return (
    <Container fluid >
      <Row className='Profile__Container'>
        <Col lg="8">
          <strong>Username:</strong> {username}
          <br />
          <strong>Email:</strong> {email}
          <br />
          <strong>Quantidade de receitas:</strong>
        </Col>

        <Col lg="4" className='Profile__Container__Col2'>
          <img src={require("./../../images/default.png")} alt="pao" className='Profile__Container__Img' />
        </Col>

      </Row>
    </Container>
  )
}

export default Profile