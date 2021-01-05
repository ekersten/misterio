import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup'


import data from './data';

function App() {
  
  const [monsters, setMonsters] = useState(data.monsters);
  const [victims, setVictims] = useState(data.victims);
  const [rooms, setRooms] = useState(data.rooms);

  const enabledMonsters = monsters.filter(monster => monster.enabled);
  const enabledVictims = victims.filter(victim => victim.enabled);
  const enabledRooms = rooms.filter(room => room.enabled);

  const toggleRoom = room => {
    setRooms(prevRooms => {
      const newRooms = prevRooms.filter(item => item.id !== room.id);
      const roomCopy = {...room};
      roomCopy.enabled = !roomCopy.enabled;

      return [
        ...newRooms,
        roomCopy
      ];
    })
  }

  const toggleVictim = victim => {
    setVictims(prevVictims => {
      const newVictims = prevVictims.filter(item => item.id !== victim.id);
      const victimCopy = { ...victim };
      victimCopy.enabled = !victimCopy.enabled;

      return [
        ...newVictims,
        victimCopy
      ];
    })
  }

  const toggleMonster = monster => {
    setMonsters(prevMonsters => {
      const newMonsters = prevMonsters.filter(item => item.id !== monster.id);
      const monsterCopy = { ...monster };
      monsterCopy.enabled = !monsterCopy.enabled;

      return [
        ...newMonsters,
        monsterCopy
      ];
    })
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Monstruos
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <ListGroup>
                    {monsters.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map(monster => (
                        <ListGroup.Item key={`monster-${monster.id}`}>
                        <Form.Check type="checkbox" id={`monster-${monster.id}-checkbox`} checked={monster.enabled} label={monster.name} onChange={() => toggleMonster(monster)} />
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                Víctimas
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <ListGroup>
                    {victims.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map(victim => (
                      <ListGroup.Item key={`victim-${victim.id}`}>
                        <Form.Check type="checkbox" id={`victim-${victim.id}-checkbox`} checked={victim.enabled} label={victim.name} onChange={() => toggleVictim(victim)} />
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                Habitaciones
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <ListGroup>
                    {rooms.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map(room => (
                      <ListGroup.Item key={`room-${room.id}`}>
                        <Form.Check type="checkbox" id={`room-${room.id}-checkbox`} checked={room.enabled} label={room.name} onChange={() => toggleRoom(room)} />
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="3">
                { enabledMonsters.length * enabledVictims.length * enabledRooms.length } Combinaciones
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <ListGroup>
                    {monsters.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).filter(monster => monster.enabled).map(monster => (
                      victims.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).filter(victim => victim.enabled).map(victim => (
                        rooms.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).filter(room => room.enabled).map(room => (
                          <ListGroup.Item key={`combination-${monster.id}-${victim.id}-${room.id}`}>
                            {monster.name} mató a {victim.name} en {room.name}
                          </ListGroup.Item>
                        ))
                      ))
                    ))}
                  </ListGroup>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
    </Container>
    
  );
}

export default App;
