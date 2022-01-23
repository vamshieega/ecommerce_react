import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

const Announcement = () => {
  return (
    <Container>Lorem ipsum, dolor sit amet consectetur adipisicing.</Container>
  );
};

export default Announcement;
