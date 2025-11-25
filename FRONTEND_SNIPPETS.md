
Frontend fetch examples:

// Get interviews
fetch('http://localhost:5000/api/interviews')
  .then(res=>res.json()).then(console.log);

// Add interview (POST)
fetch('http://localhost:5000/api/interviews', {
  method: 'POST',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({
    candidateName: 'John Doe',
    position: 'Frontend Developer',
    date: '2025-01-18',
    time: '10:00 AM',
    status: 'Scheduled'
  })
}).then(res=>res.json()).then(console.log);
