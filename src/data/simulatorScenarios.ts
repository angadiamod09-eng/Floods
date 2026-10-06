import { SimulatorScenario } from '../types';

export const SIMULATOR_SCENARIOS: SimulatorScenario[] = [
  {
    id: 1,
    situation: 'Heavy rainfall has continued for several hours and floodwater begins entering your ground floor.',
    context: 'Water depth is slowly rising and reaching ankle level inside the doorway.',
    options: [
      {
        id: 'A',
        text: 'Continue normal activities and wait to see if the rain stops.',
        isSafe: false,
        explanation: 'Water levels can surge unpredictably. Ignoring rising water risks trapping occupants and exposes them to rapid electrocution or swift flow hazards.'
      },
      {
        id: 'B',
        text: 'Grab your prepared emergency kit, move occupants and critical items to higher ground or upper floor, and monitor official emergency broadcasts.',
        isSafe: true,
        explanation: 'Prioritizing immediate personal safety, securing your kit, and seeking vertical elevation minimizes exposure to rising water and hidden contaminants.'
      },
      {
        id: 'C',
        text: 'Wade outside barefoot into the front yard to check where the water is coming from.',
        isSafe: false,
        explanation: 'Entering floodwater exposes you to hidden open drains, submerged sharp debris, toxic runoff, and unseen electrical currents.'
      }
    ]
  },
  {
    id: 2,
    situation: 'Water is rising inside the home and the main electrical breaker is located in a partially wet utility area.',
    context: 'The floor near the electrical panel already has water puddles, and power is still flowing in the house.',
    options: [
      {
        id: 'A',
        text: 'Wade through the water puddle quickly to flip the main electrical breaker switch.',
        isSafe: false,
        explanation: 'Never touch electrical switches, cords, or breaker boxes while standing in or near water. This creates an immediate risk of lethal electrical shock.'
      },
      {
        id: 'B',
        text: 'Do not approach the wet electrical panel. Evacuate immediately to higher ground and notify the electrical utility or emergency services.',
        isSafe: true,
        explanation: 'Water conducts electricity. If you cannot reach the main switch from a completely dry location using dry, non-conductive tools, leave immediately and alert authorities.'
      },
      {
        id: 'C',
        text: 'Unplug individual electrical appliances standing submerged in the water.',
        isSafe: false,
        explanation: 'Touching submerged cables or plugs carries severe electrocution hazard. Keep completely clear of water that may be energized.'
      }
    ]
  },
  {
    id: 3,
    situation: 'You are walking to higher ground and encounter a street covered with murky moving floodwater.',
    context: 'The water seems to be only 6 inches deep, but it is moving steadily across the road.',
    options: [
      {
        id: 'A',
        text: 'Turn around and find an alternate higher route that does not cross moving water.',
        isSafe: true,
        explanation: 'Just 6 inches of swiftly flowing water can knock a full-grown adult off their feet. Hidden obstacles, dislodged manhole covers, and drop-offs cannot be seen in murky water.'
      },
      {
        id: 'B',
        text: 'Link arms with someone and try to run through the moving water quickly.',
        isSafe: false,
        explanation: 'Current velocity creates enormous hydraulic force. Linking arms increases the risk of multiple people falling and being swept downstream together.'
      },
      {
        id: 'C',
        text: 'Use a stick to wade slowly into the center of the current.',
        isSafe: false,
        explanation: 'Even with a stick, moving current can easily undermine footing or sweep you into drainage ditches, canals, or debris traps.'
      }
    ]
  },
  {
    id: 4,
    situation: 'Local authorities and emergency services issue an official evacuation warning for your neighborhood.',
    context: 'The weather outside is currently calm, but an upstream dam release or river crest is predicted within 2 hours.',
    options: [
      {
        id: 'A',
        text: 'Wait until you actually see water in the driveway before beginning to pack belongings.',
        isSafe: false,
        explanation: 'Waiting until water is visible leaves no escape window. Roads can flood or become gridlocked within minutes, trapping you in a danger zone.'
      },
      {
        id: 'B',
        text: 'Evacuate immediately following designated evacuation routes, carrying your emergency kit and essential medicines.',
        isSafe: true,
        explanation: 'Official evacuation warnings are issued based on hydrology forecasts. Early evacuation allows calm, safe passage along unobstructed high-ground routes.'
      },
      {
        id: 'C',
        text: 'Post on social media asking neighbors if they think the warning is really necessary.',
        isSafe: false,
        explanation: 'Social media rumors cause dangerous delays. Always act directly upon official instructions from authorized disaster management agencies.'
      }
    ]
  },
  {
    id: 5,
    situation: 'An evacuation order is in effect, but an elderly family member insists on staying behind to guard possessions.',
    context: 'The water level outside is rising toward the doorstep and emergency personnel urge departure.',
    options: [
      {
        id: 'A',
        text: 'Respect their decision, leave them alone with a flashlight, and evacuate with the rest of the family.',
        isSafe: false,
        explanation: 'Leaving vulnerable individuals behind in a rising flood zone can prove fatal. Rescuers might not be able to reach them once water levels peak.'
      },
      {
        id: 'B',
        text: 'Calmly explain that belongings can be replaced but lives cannot, assist them with their vital medications and mobility aids, and evacuate together immediately.',
        isSafe: true,
        explanation: 'Clear, empathetic communication emphasizing personal survival, along with active physical assistance with essential medical needs, is the safest, most effective response.'
      },
      {
        id: 'C',
        text: 'Stay behind with them in the house to protect them and guard the property together.',
        isSafe: false,
        explanation: 'Staying doubles the number of lives placed in direct mortal danger and will require rescue personnel to risk their lives later.'
      }
    ]
  },
  {
    id: 6,
    situation: 'Your municipal tap water is running brown and murky, and local news warns of potential water treatment plant inundation.',
    context: 'You are thirsty and need to prepare baby formula and drink water.',
    options: [
      {
        id: 'A',
        text: 'Drink from the tap after letting it run for 30 seconds to clear the initial sediment.',
        isSafe: false,
        explanation: 'Running tap water does not remove waterborne pathogens, industrial chemicals, or sewage contamination introduced during flooding.'
      },
      {
        id: 'B',
        text: 'Use strictly sealed bottled water from your emergency kit, or boil tap water vigorously for at least 1 full minute if bottled is unavailable.',
        isSafe: true,
        explanation: 'Sealed commercially bottled water is the safest choice. If boiling is necessary, bringing water to a rolling boil for 1 minute kills most bacteria, viruses, and parasites.'
      },
      {
        id: 'C',
        text: 'Scoop floodwater from the patio and filter it through a coffee filter cloth.',
        isSafe: false,
        explanation: 'Cloth and coffee filters only capture visible particles; they cannot filter out harmful bacteria, viruses, heavy metals, or hazardous petrochemicals.'
      }
    ]
  },
  {
    id: 7,
    situation: 'During a sudden flood evacuation at a crowded transit station, you realize a family member has become separated from you.',
    context: 'Cellular signals are intermittent and people are moving toward emergency buses.',
    options: [
      {
        id: 'A',
        text: 'Proceed to your pre-agreed Family Safety Plan designated meeting location, notify emergency station wardens, and try sending an SMS.',
        isSafe: true,
        explanation: 'Having a predetermined meeting point avoids frantic wandering into hazard areas. SMS texts often transmit through congested cellular towers when voice calls fail.'
      },
      {
        id: 'B',
        text: 'Run back into the flooded lower concourse alone to search every platform.',
        isSafe: false,
        explanation: 'Re-entering flooding zones creates an additional victim and makes coordinated rescue exponentially harder.'
      },
      {
        id: 'C',
        text: 'Wait indefinitely in the middle of the crowded evacuation pathway hoping they walk by.',
        isSafe: false,
        explanation: 'Blocking evacuation pathways creates bottlenecks and risks being separated from emergency assistance without utilizing designated reunion points.'
      }
    ]
  },
  {
    id: 8,
    situation: 'You are trapped on the ground floor as water rushes in at high speed through breached doors.',
    context: 'The current is fast and water is already at waist height. The building has an accessible upper floor and attic.',
    options: [
      {
        id: 'A',
        text: 'Attempt to swim through the open door against the current to reach the street.',
        isSafe: false,
        explanation: 'Swimming against fast flood currents is virtually impossible. Fast water sweeps swimmers into submerged obstacles, fences, and turbulent undertows.'
      },
      {
        id: 'B',
        text: 'Climb immediately to the highest accessible level or upper floor, taking a phone, flashlight, and whistle for signaling rescuers.',
        isSafe: true,
        explanation: 'Vertical evacuation to the highest safe floor buys crucial time. Always bring signaling tools (whistle, flashlight) and ensure you have an exit path to the roof if water keeps rising.'
      },
      {
        id: 'C',
        text: 'Hide in an enclosed basement or ground-floor bathroom and lock the door.',
        isSafe: false,
        explanation: 'Basements and low enclosed rooms are deadly flood traps that fill rapidly with zero escape possibilities.'
      }
    ]
  },
  {
    id: 9,
    situation: 'You are driving an SUV home and approach a dip in the road with water covering the asphalt. You cannot see the road markings.',
    context: 'Another driver behind you honks and encourages you to push through.',
    options: [
      {
        id: 'A',
        text: 'Speed up so momentum pushes the SUV through before water enters the engine.',
        isSafe: false,
        explanation: 'Speeding creates a bow wave that forces water directly into the engine air intake, stalling the car instantly and trapping you in moving water.'
      },
      {
        id: 'B',
        text: 'Turn Around, Don’t Drown: Reverse safely, do not enter the water, and locate a confirmed high-ground alternative road.',
        isSafe: true,
        explanation: 'Most flood fatalities occur in vehicles. 12 inches of water can float a car, and 2 feet will carry away heavy trucks and SUVs. The road surface below may also have washed away.'
      },
      {
        id: 'C',
        text: 'Drive slowly in low gear along the center of the road to test the depth.',
        isSafe: false,
        explanation: 'It is impossible to judge depth or road integrity under murky floodwater. Vehicles can be swept sideways off embankments in seconds.'
      }
    ]
  },
  {
    id: 10,
    situation: 'The rain has stopped, floodwater has started to recede from your neighborhood streets, and the sun is out.',
    context: 'You want to check your house, but emergency services have not yet declared the area safe.',
    options: [
      {
        id: 'A',
        text: 'Return to your home immediately and turn on all lights to check if electrical power is still functioning.',
        isSafe: false,
        explanation: 'Turning on power in flooded or moisture-damaged structures causes electrical explosions or fatal electrocution. Standing water may conceal fallen power lines.'
      },
      {
        id: 'B',
        text: 'Wait for official confirmation from local authorities that the area is safe before returning, and watch for structural instability and gas leaks.',
        isSafe: true,
        explanation: 'Receding floodwaters leave compromised foundations, gas leaks, sewage contamination, and unstable ground. Safety strictly comes before property inspection.'
      },
      {
        id: 'C',
        text: 'Drink from the kitchen faucet and start sweeping standing water into the street barefoot.',
        isSafe: false,
        explanation: 'Tap systems may be contaminated with sewage. Walking barefoot in flood silt exposes you to tetanus, chemicals, broken glass, and biological toxins.'
      }
    ]
  }
];
