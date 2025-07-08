"use client";
import { useEffect, useState } from "react";
import DonationCard from "./DonationCard";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

export default function DonationsPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/donations")
      .then((res) => res.json())
      .then((data) => {
        setDonations(data);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Donations
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : donations.length === 0 ? (
        <Typography>No donations yet.</Typography>
      ) : (
        donations.map((donation) => (
          <DonationCard key={donation.id} {...donation} />
        ))
      )}
    </Container>
  );
}