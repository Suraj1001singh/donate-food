import "./dona.css";
import Navbar from "../../components/NavBar/Navbar";

import { Container, Button } from "react-bootstrap";
import { BiCalendar } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import "./dona.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Donacont() {
  const [donations, setdonations] = useState([]);
  useEffect(async () => {
    const getDonations = async () => {
      // const res = await axios.get('http://localhost:2000/api/event/getevent');
      const res = await axios({
        method: "get",
        url: "http://localhost:2000/api/event/getevent",
      });
      console.log("res ", res.data.events);
      return res;
    };
    const resDonations = await getDonations();
    if (resDonations) {
      setdonations(resDonations.data.events);
    }
  }, []);
  return (
    <div className="bg">
      <Navbar />
      <Container className="box" fluid flex>
        <div className="headings"> Donations </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {donations &&
            donations?.map((donation) => (
              <div className="bg" key={donation._id}>
                <Container className="dcard">
                  <img
                    src={donation?.foodPoster[0]?.url}
                    height="150px"
                    alt="product"
                    style={{
                      borderTopRightRadius: "1rem",
                      borderTopLeftRadius: "1rem",
                      width: "100%",
                    }}
                  ></img>
                  <div className="p-3">
                    <h3>{donation?.Name}</h3>
                    <br />
                    <p style={{ color: "#3d3d3d" }}>If any organization who serves the food to needy can accept this.</p>
                    <div>
                      <BiCalendar /> <span>Date</span>: 30 oct 2021
                      <br />
                      <GoLocation /> <span>Location</span>:{donation?.driveSpot?.address + " " + donation?.driveSpot?.city + " " + donation?.driveSpot?.district + " " + donation?.driveSpot?.postalCode}
                      <br />
                      <GoPerson />
                      <span> Post by</span>: {donation?.DonatedBy?.Name}
                      <br />
                    </div>
                  </div>
                  <div class="overlay">
                    <Button variant="warning">Chat with Donor</Button>
                  </div>
                </Container>
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
}
