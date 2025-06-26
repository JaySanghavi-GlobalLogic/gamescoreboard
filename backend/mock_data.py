import uuid
import random
import uuid
from datetime import datetime

def generate_mock_scoreboard():
    lines = [f"Line {i}" for i in range(1, 7)]
    shifts = ["1st Shift", "2nd Shift"]
    colors = ["bg-green-500", "bg-gray-400", "bg-red-500"]
    pwr_signs = ["Up", "Down", "Star"]

    return {
        "scoreId": str(uuid.uuid4()),
        "headers": [
            'Location (Shift OEE)', 'Start (Mins)', 'Ramp Up (Mins)',
            'Pwr Hr (OEE)', 'Counts', 'Huddles (Count)', 'SKUs (Count)',
            'Avg C/O (Mins)', 'Points',
        ],
        "rows": [
            {
                "location": [line, random.choice(shifts)],
                "oee": round(random.uniform(50, 100), 1),
                "start": 0,
                "rampUp": random.randint(0, 1),
                "pwrHr": round(random.uniform(40, 100), 1),
                "pwrHrSign": random.choice(pwr_signs),
                "counts": [random.randint(20, 100) for _ in range(random.randint(5, 10))],
                "huddles": random.randint(0, 1),
                "skus": random.randint(1, 3),
                "avgCO": "-",
                "points": random.choice([0, 8, 10, 12]),
                "helmetColor": random.choice(colors),
            }
            for line in lines
        ],
        "scoreBoardOptions": ["Score", "Game", "Shift", "Run", "Flow", "Units", "Pareto"]
    }

def generate_mock_throughput():
    lines = [f"Line {i}" for i in range(1, 6)]
    hours = ["5 AM", "9 AM", "11 AM", "1 PM", "3 PM", "5 PM"]
    signs = ["Up", "Down", "Star"]

    data = []
    for line in lines:
        hourlyData = [
            {
                "hour": hour,
                "value": random.randint(0, 15),
                "sign": random.choice(signs)
            }
            for hour in random.sample(hours, k=random.randint(3, 5))
        ]
        total = sum(d["value"] for d in hourlyData)
        data.append({
            "name": line,
            "hourlyData": hourlyData,
            "total": total,
            "diff": random.randrange(0, 500),
            "unit": random.choice(["CASES", "CAN", "UNITS"]),
            "color": "bg-green-500" if total < 20 else 'bg-red-500',
            "people": f"{random.randint(3, 10)}/{random.randint(0, 3)}"
        })
    return data

def generate_mock_unitsdata():
    hours = ["2 PM", "3 PM", "4 PM", "5 PM"]
    return {
        "unitsManHourData": [
            {"time": hour, "value": random.randint(5, 15)} for hour in hours
        ],
        "navItems": [
            "Counts", "OEE", "Hourly Counts", "Units/Man Hour",
            "Run Speed", "Cycles", "X-Bar R"
        ],
        "xBarData": {
            "xBarRData": [
                {"time": f"{h:02}:00 AM", "mean": round(random.uniform(7.5, 9.5), 1),
                 "range": round(random.uniform(1.0, 2.0), 1)} for h in [8, 9, 12, 16]
            ],
            "xBarStats": {
                "USL": 9.0,
                "LSL": 7.0,
                "mean": round(random.uniform(8.0, 8.5), 2),
                "sigma": 0.25,
            },
        },
        "rChartData": {
            "Stats": {
                "UCL": 0.5,
                "LCL": 0.1,
                "mean": round(random.uniform(0.2, 0.4), 2),
            }
        }
    }

mock_scoreboard_data = {
    "scoreId": str(uuid.uuid4()),
    "headers": [
        'Location (Shift OEE)',
        'Start (Mins)',
        'Ramp Up (Mins)',
        'Pwr Hr (OEE)',
        'Counts',
        'Huddles (Count)',
        'SKUs (Count)',
        'Avg C/O (Mins)',
        'Points',
    ],
    "rows": [
        {
            "location": ["Line 22", "2nd Shift"],
            "oee": 94.5,
            "start": 0,
            "rampUp": 0,
            "pwrHr": 92.3,
            "pwrHrSign": "Up",
            "counts": [80, 92, 88, 45, 90, 91, 89, 94, 97, 92],
            "huddles": 0,
            "skus": 1,
            "avgCO": "-",
            "points": 12,
            "helmetColor": "bg-green-500"
        },
        {
            "location": ["Line 3", "2nd Shift"],
            "oee": 91.0,
            "start": 0,
            "rampUp": 1,
            "pwrHr": 90.7,
            "pwrHrSign": "Up",
            "counts": [70, 68, 40, 72, 80, 29, 81],
            "huddles": 0,
            "skus": 1,
            "avgCO": "-",
            "points": 10,
            "helmetColor": "bg-gray-400"
        },
        {
            "location": ["Line 2", "2nd Shift"],
            "oee": 92.9,
            "start": 0,
            "rampUp": 1,
            "pwrHr": 98.0,
            "pwrHrSign": "Star",
            "counts": [88, 11, 94, 96, 38, 97],
            "huddles": 0,
            "skus": 1,
            "avgCO": "-",
            "points": 8,
            "helmetColor": "bg-gray-400"
        },
        {
            "location": ["Line 5", "2nd Shift"],
            "oee": 80.2,
            "start": 0,
            "rampUp": 1,
            "pwrHr": 83.6,
            "pwrHrSign": "Star",
            "counts": [55, 60, 45, 70, 75, 50, 78],
            "huddles": 0,
            "skus": 1,
            "avgCO": "-",
            "points": 8,
            "helmetColor": "bg-gray-400"
        },
        {
            "location": ["Line 6", "2nd Shift"],
            "oee": 63.6,
            "start": 0,
            "rampUp": 1,
            "pwrHr": 52.4,
            "pwrHrSign": "Down",
            "counts": [30, 40, 35, 50, 45, 38],
            "huddles": 0,
            "skus": 1,
            "avgCO": "-",
            "points": 0,
            "helmetColor": "bg-red-500"
        },
        {
            "location": ["Line 1", "2nd Shift"],
            "oee": 55.7,
            "start": 0,
            "rampUp": 0,
            "pwrHr": 47.2,
            "pwrHrSign": "Down",
            "counts": [45, 20, 10, 25, 12, 18],
            "huddles": 0,
            "skus": 1,
            "avgCO": "-",
            "points": 0,
            "helmetColor": "bg-red-500"
        }
    ],
    "scoreBoardOptions": ["Score", "Game", "Shift", "Run", "Flow", "Units", "Pareto"]
}


# mock_data.py

mock_throughput_lines = [
    {
        "name": "Line 1",
        "hourlyData": [
            {"hour": "5 AM", "value": 0, "sign": "Down"},
            {"hour": "9 AM", "value": 5, "sign": "Down"},
            {"hour": "11 AM", "value": 10, "sign": "Down"},
            {"hour": "1 PM", "value": 1, "sign": "Down"},
            {"hour": "3 PM", "value": 1, "sign": "Down"},
        ],
        "total": 0,
        "diff": 0,
        "unit": "CASES",
        "color": "bg-red-500",
        "people": "34/0",
    },
    {
        "name": "Line 2",
        "hourlyData": [
            {"hour": "9 AM", "value": 4, "sign": "Up"},
            {"hour": "11 AM", "value": 6, "sign": "Up"},
            {"hour": "1 PM", "value": 5, "sign": "Star"},
            {"hour": "3 PM", "value": 7, "sign": "Up"},
        ],
        "total": 1493,
        "diff": 254,
        "unit": "CASES",
        "color": "bg-green-500",
        "people": "4/0",
    },
    {
        "name": "Line 3",
        "hourlyData": [
            {"hour": "9 AM", "value": 6, "sign": "Up"},
            {"hour": "11 AM", "value": 8, "sign": "Up"},
            {"hour": "1 PM", "value": 10, "sign": "Star"},
            {"hour": "3 PM", "value": 9, "sign": "Star"},
        ],
        "total": 15303,
        "diff": 2908,
        "unit": "CAN",
        "color": "bg-green-500",
        "people": "5/0",
    },
    {
        "name": "Line 4",
        "hourlyData": [
            {"hour": "5 AM", "value": 12, "sign": "Up"},
            {"hour": "10 AM", "value": 1, "sign": "Up"},
            {"hour": "2 PM", "value": 5, "sign": "Star"},
            {"hour": "5 PM", "value": 6, "sign": "Star"},
        ],
        "total": 15303,
        "diff": 2908,
        "unit": "CAN",
        "color": "bg-green-500",
        "people": "5/0",
    },
    # Add more lines as needed...
]


mock_unitsdata = {
    "unitsManHourData": [
        {"time": "2 PM", "value": 6},
        {"time": "3 PM", "value": 10},
        {"time": "4 PM", "value": 10},
        {"time": "5 PM", "value": 9},
    ],
    "navItems": [
        "Counts",
        "OEE",
        "Hourly Counts",
        "Units/Man Hour",
        "Run Speed",
        "Cycles",
        "X-Bar R",
    ],
    "xBarData": {
        "xBarRData": [
            {"time": "08:00 AM", "mean": 8.2, "range": 1.5},
            {"time": "09:00 AM", "mean": 7.8, "range": 1.2},
            {"time": "12:00 PM", "mean": 8.5, "range": 1.9},
            {"time": "04:00 PM", "mean": 8.0, "range": 1.3},
        ],
        "xBarStats": {
            "USL": 9.0,
            "LSL": 7.0,
            "mean": 8.13,
            "sigma": 0.25,
        },
    },
    "rChartData": {
        "Stats": {
            "UCL": 0.5,
            "LCL": 0.1,
            "mean": 0.3,
        }
    }
}
