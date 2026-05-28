/* ============================================================
   The Whole Heart — interactions
   Meal/movement plan rendering, BP checker, habit tracker,
   tab switching and scroll reveals. Loaded with `defer`, so the
   DOM is ready and top-level functions (checkBP) are global for
   the inline onclick handlers in index.html.
   ============================================================ */

  /* ---------- 14-DAY MEAL DATA ---------- */
  const days = [
    // WEEK 1
    {tag:"Mon", dawn:"Warm lemon water with grated fresh ginger", bfast:"Steel-cut oats with blueberries, ground flaxseed, walnuts & cinnamon", lunch:"Quinoa & chickpea salad — cucumber, tomato, parsley, olive oil & lemon", dinner:"Baked salmon, roasted broccoli, brown rice", night:"Chamomile tea"},
    {tag:"Tue", dawn:"Green tea with a squeeze of lemon", bfast:"Unsweetened Greek yogurt with mixed berries, chia seeds & almonds", lunch:"Lentil soup with a side of mixed greens in olive oil", dinner:"Grilled chicken breast, sweet potato, garlic-sautéed spinach", night:"Warm turmeric milk (oat or low-fat, pinch of black pepper)"},
    {tag:"Wed", dawn:"Fresh beetroot & apple juice (no added sugar)", bfast:"Whole-grain toast with smashed avocado, tomato & chili flakes", lunch:"Mediterranean bowl — farro, roasted veg, hummus & olives", dinner:"Baked mackerel, quinoa, steamed green beans", night:"Peppermint tea"},
    {tag:"Thu", dawn:"Warm water with 1 tsp apple cider vinegar & a little honey", bfast:"Overnight oats with banana, peanut butter, cocoa & chia", lunch:"Three-bean salad — bell peppers, red onion, lemon-olive dressing", dinner:"Tofu & vegetable stir-fry (low-sodium tamari), brown rice", night:"Chamomile & lavender tea"},
    {tag:"Fri", dawn:"Cucumber, celery & green apple juice", bfast:"Veggie omelet (1 egg + whites) with spinach, mushroom, tomato; side of berries", lunch:"Tuna (in water) salad with chickpeas, arugula, cherry tomatoes & olive oil", dinner:"Lentil & vegetable curry (light coconut milk), small portion brown rice", night:"Warm almond milk with cinnamon"},
    {tag:"Sat", dawn:"Warm lemon & ginger water", bfast:"Smoothie — spinach, banana, berries, flaxseed, unsweetened almond milk", lunch:"Grilled vegetable & quinoa salad with a little feta & pumpkin seeds", dinner:"Baked cod with herbs, roasted Brussels sprouts, wild rice", night:"Rooibos tea"},
    {tag:"Sun", dawn:"Green smoothie shot — spinach & lemon", bfast:"Buckwheat pancakes with berries, walnuts & a drizzle of honey", lunch:"Low-sodium minestrone soup with a whole-grain roll", dinner:"Chicken souvlaki, Greek salad, tzatziki, small whole-wheat pita", night:"Chamomile tea"},
    // WEEK 2
    {tag:"Mon", dawn:"Warm water with turmeric & lemon", bfast:"Chia pudding (almond milk) with mango & pistachios", lunch:"Brown rice & black bean bowl — avocado, salsa, lime, cilantro", dinner:"Baked salmon, asparagus, quinoa", night:"Peppermint tea"},
    {tag:"Tue", dawn:"Small glass of fresh pomegranate juice", bfast:"Oatmeal with grated apple, cinnamon, walnuts & flaxseed", lunch:"Chickpea & spinach stew with tomato + side salad", dinner:"Grilled turkey breast, roasted root veg, steamed broccoli", night:"Warm turmeric milk"},
    {tag:"Wed", dawn:"Celery juice", bfast:"Whole-grain toast with almond butter, banana slices & chia", lunch:"Lentil tabbouleh — parsley, mint, tomato, bulgur, lemon & olive oil", dinner:"Baked trout, garlic-sautéed kale, sweet potato mash", night:"Chamomile tea"},
    {tag:"Thu", dawn:"Warm lemon water with a pinch of cayenne", bfast:"Greek yogurt with walnuts, berries, ground flax & a drizzle of honey", lunch:"Quinoa-stuffed bell peppers with black beans & corn", dinner:"Tofu & broccoli stir-fry with soba (buckwheat) noodles", night:"Rooibos tea"},
    {tag:"Fri", dawn:"Beetroot, carrot & ginger juice", bfast:"Smoothie bowl — berries, banana, spinach, topped with granola & seeds", lunch:"White bean & tuna salad — arugula, red onion, olive oil", dinner:"Baked salmon, roasted peppers & zucchini, farro", night:"Warm almond milk with nutmeg"},
    {tag:"Sat", dawn:"Green tea with lemon", bfast:"Savory oats with spinach, egg & mushrooms", lunch:"Light chickpea & vegetable tagine with whole-wheat couscous", dinner:"Grilled chicken, quinoa tabbouleh, cucumber-tomato salad", night:"Peppermint tea"},
    {tag:"Sun", dawn:"Warm water with lemon, ginger & turmeric", bfast:"Buckwheat porridge with berries, almonds & chia", lunch:"Low-sodium mixed-bean chili with brown rice & avocado", dinner:"Baked cod, roasted Mediterranean vegetables, wild rice", night:"Chamomile & lavender tea"}
  ];

  const meals = [
    {k:"dawn",   cls:"ic-dawn",   ic:"🌅", label:"On waking"},
    {k:"bfast",  cls:"ic-bfast",  ic:"🍳", label:"Breakfast"},
    {k:"lunch",  cls:"ic-lunch",  ic:"🥗", label:"Lunch"},
    {k:"dinner", cls:"ic-dinner", ic:"🍽️", label:"Dinner"},
    {k:"night",  cls:"ic-night",  ic:"🌙", label:"Night drink"}
  ];

  function buildDay(d, index){
    const card = document.createElement('div');
    card.className = 'day-card';
    let html = `<div class="day-head"><span class="dnum">Day ${index+1}</span><span class="dtag">${d.tag}</span></div>`;
    meals.forEach(m=>{
      html += `<div class="meal">
        <div class="meal-ic ${m.cls}">${m.ic}</div>
        <div class="meal-body"><span>${m.label}</span><p>${d[m.k]}</p></div>
      </div>`;
    });
    card.innerHTML = html;
    return card;
  }

  const grid1 = document.getElementById('grid-1');
  const grid2 = document.getElementById('grid-2');
  days.slice(0,7).forEach((d,i)=>grid1.appendChild(buildDay(d,i)));
  days.slice(7,14).forEach((d,i)=>grid2.appendChild(buildDay(d,i+7)));

  /* ---------- MOVEMENT 14-DAY PLANS ---------- */
  const movePlans = {
    beginner:{
      summary:[["Sessions","4–5 / week"],["Weekly aerobic","~120 min"],["Intensity","Gentle & steady"]],
      days:[
        {type:"Walk",cls:"t-walk",title:"Easy starter walk",detail:"15-min walk at a comfortable, chatty pace, then 5 min of light full-body stretching.",time:"⏱ 20 min"},
        {type:"Mobility",cls:"t-recovery",title:"Stretch & breathe",detail:"10 min of gentle stretches for hips, back and shoulders + 5 min of slow deep breathing.",time:"⏱ 15 min"},
        {type:"Walk",cls:"t-walk",title:"Posture walk",detail:"20-min relaxed walk. Stand tall, shoulders loose, breathe through the nose.",time:"⏱ 20 min"},
        {type:"Strength",cls:"t-strength",title:"Bodyweight basics",detail:"2 rounds: wall push-ups ×8, sit-to-stand from a chair ×10, calf raises ×12.",time:"⏱ 20 min"},
        {type:"Recovery",cls:"t-recovery",title:"Light & loose",detail:"Optional 10-min stroll or simply rest. Today is about feeling restored.",time:"⏱ 10 min"},
        {type:"Nature",cls:"t-nature",title:"Green-space walk",detail:"25-min walk in a park or tree-lined street. Notice three sounds and three sights.",time:"⏱ 25 min"},
        {type:"Recovery",cls:"t-recovery",title:"Gentle yoga",detail:"12 min of beginner yoga or stretching. Slow and easy — never strain.",time:"⏱ 12 min"},
        {type:"Walk",cls:"t-walk",title:"Brisk-ish walk",detail:"25-min walk, lift the pace a little so your breathing deepens.",time:"⏱ 25 min"},
        {type:"Strength",cls:"t-strength",title:"Bodyweight basics II",detail:"2 rounds: knee push-ups ×8, glute bridges ×12, bird-dog ×8/side, calf raises ×12.",time:"⏱ 22 min"},
        {type:"Mobility",cls:"t-recovery",title:"Balance & stretch",detail:"12 min stretching plus single-leg balance holds (hold a chair if you need to).",time:"⏱ 15 min"},
        {type:"Walk",cls:"t-walk",title:"Walk with a hill",detail:"30-min walk; add a gentle incline or a flight of stairs if you can.",time:"⏱ 30 min"},
        {type:"Nature",cls:"t-nature",title:"Easy trail",detail:"30-min walk or very easy hike on slightly uneven ground.",time:"⏱ 30 min"},
        {type:"Strength",cls:"t-strength",title:"Full-body round",detail:"3 rounds: sit-to-stand ×12, wall push-ups ×10, band rows ×12, glute bridge ×12.",time:"⏱ 28 min"},
        {type:"Walk",cls:"t-walk",title:"Milestone walk",detail:"35-min easy walk. Notice how much steadier this feels than Day 1 — celebrate it.",time:"⏱ 35 min"}
      ]
    },
    intermediate:{
      summary:[["Sessions","~6 / week"],["Weekly aerobic","150+ min"],["Intensity","Moderate"]],
      days:[
        {type:"Aerobic",cls:"t-walk",title:"Steady cardio",detail:"30-min brisk walk or easy jog at a conversational-but-working pace.",time:"⏱ 30 min"},
        {type:"Strength",cls:"t-strength",title:"Full body",detail:"3×10 squats, 3×10 push-ups, 3×10 dumbbell or band rows, 3×30s plank.",time:"⏱ 40 min"},
        {type:"Recovery",cls:"t-recovery",title:"Active recovery",detail:"20-min easy walk + 10 min mobility for hips and upper back.",time:"⏱ 30 min"},
        {type:"Intervals",cls:"t-interval",title:"Walk-jog intervals",detail:"25 min: alternate 1 min faster effort with 2 min easy. Repeat throughout.",time:"⏱ 25 min"},
        {type:"Strength",cls:"t-strength",title:"Lower + core",detail:"Goblet squats, reverse lunges, glute bridges and dead-bug — 3 rounds.",time:"⏱ 40 min"},
        {type:"Nature",cls:"t-nature",title:"Hike or ride",detail:"60-min hike, longer outdoor walk, or bike ride. Enjoy varied terrain.",time:"⏱ 60 min"},
        {type:"Recovery",cls:"t-recovery",title:"Rest & stretch",detail:"Full rest or a gentle 15-min stretch. Let your body adapt.",time:"⏱ 15 min"},
        {type:"Aerobic",cls:"t-walk",title:"Steady cardio II",detail:"35-min steady jog, cycle, row, or swim — keep the effort even.",time:"⏱ 35 min"},
        {type:"Strength",cls:"t-strength",title:"Upper + core",detail:"Push-ups, dumbbell press, rows and plank variations — 3 rounds.",time:"⏱ 40 min"},
        {type:"Recovery",cls:"t-recovery",title:"Yoga / mobility",detail:"25 min of yoga or a full mobility flow. Breathe through each stretch.",time:"⏱ 25 min"},
        {type:"Intervals",cls:"t-interval",title:"Faster intervals",detail:"30 min: 30s strong effort / 90s easy × 8. Warm up and cool down well.",time:"⏱ 30 min"},
        {type:"Nature",cls:"t-nature",title:"Longer hike",detail:"75–90 min hike or trail walk. Bring water and vary the route.",time:"⏱ 85 min"},
        {type:"Strength",cls:"t-strength",title:"Full body, heavier",detail:"Squats, light-to-moderate deadlifts, press and rows — focus on clean form.",time:"⏱ 45 min"},
        {type:"Aerobic",cls:"t-walk",title:"Steady + plan",detail:"40-min steady effort, then map out your next two-week block.",time:"⏱ 40 min"}
      ]
    },
    advanced:{
      summary:[["Sessions","6–7 / week"],["Weekly aerobic","200+ min"],["Intensity","High / varied"]],
      days:[
        {type:"Strength",cls:"t-strength",title:"Lower strength",detail:"Back squat 4×6, Romanian deadlift 3×8, walking lunges, calf raises.",time:"⏱ 55 min"},
        {type:"Aerobic",cls:"t-walk",title:"Zone-2 endurance",detail:"45–60 min steady run, ride, or row at an easy nasal-breathing pace.",time:"⏱ 55 min"},
        {type:"Strength",cls:"t-strength",title:"Upper push",detail:"Bench or overhead press 4×6, dips, triceps work — controlled tempo.",time:"⏱ 55 min"},
        {type:"HIIT",cls:"t-interval",title:"Interval session",detail:"After a warm-up: 5 × 3 min hard / 2 min easy. Commit to the hard blocks.",time:"⏱ 40 min"},
        {type:"Strength",cls:"t-strength",title:"Upper pull",detail:"Pull-ups or rows, lat work, face pulls and biceps — 4 rounds.",time:"⏱ 55 min"},
        {type:"Nature",cls:"t-nature",title:"Endurance day",detail:"90–120 min trail run, hilly hike, or long ride. Fuel and hydrate.",time:"⏱ 110 min"},
        {type:"Recovery",cls:"t-recovery",title:"Active recovery",detail:"30–40 min easy spin, swim, or yoga. Keep it genuinely light.",time:"⏱ 35 min"},
        {type:"Strength",cls:"t-strength",title:"Lower power",detail:"Deadlift 4×5, front squat, hip thrust, plus a few explosive jump sets.",time:"⏱ 60 min"},
        {type:"Aerobic",cls:"t-walk",title:"Threshold",detail:"40 min with 20–30 min held near a comfortably-hard threshold pace.",time:"⏱ 40 min"},
        {type:"Strength",cls:"t-strength",title:"Full-body circuit",detail:"Compound circuit — squat, press, row, loaded carry. 4 brisk rounds.",time:"⏱ 50 min"},
        {type:"Intervals",cls:"t-interval",title:"Sprint intervals",detail:"10–12 × 30s near-max / 90s easy. Full warm-up and cool-down.",time:"⏱ 40 min"},
        {type:"Nature",cls:"t-nature",title:"Long endurance",detail:"2+ hr hilly hike or long ride. Practise your fuelling and pacing.",time:"⏱ 130 min"},
        {type:"Strength",cls:"t-strength",title:"Accessory + core",detail:"Lighter accessory work plus dedicated core. Leave something in reserve.",time:"⏱ 45 min"},
        {type:"Test",cls:"t-test",title:"Benchmark & plan",detail:"A time trial or AMRAP test, then design your next progression cycle.",time:"⏱ 45 min"}
      ]
    }
  };

  const moveProg = {
    beginner:{
      title:"Graduating from Beginner",
      intro:"Repeat this two-week block once more — but nudge it forward each time. The aim is to make a brisk 30–40 minute walk and three clean strength rounds feel routine.",
      rules:[
        "<b>Add ~5 minutes</b> to your walks each week, working toward 30–40 min on most days.",
        "<b>Build to 3 full strength rounds</b>, 2–3 times a week, before adding any weight.",
        "<b>Level up</b> to Intermediate when a 35-min brisk walk feels easy and 3 rounds feel controlled."
      ]
    },
    intermediate:{
      title:"Pushing past Intermediate",
      intro:"Keep the same weekly shape, but make it progressively harder. Small, steady increases beat big jumps and protect the heart while you adapt.",
      rules:[
        "<b>Add load or 1–2 reps</b> roughly every week — about 10% more work over time.",
        "<b>Lengthen the intervals</b> and stretch your nature days past 90 minutes.",
        "<b>Move to Advanced</b> once you can jog ~35 min steadily and train 4×/week comfortably."
      ]
    },
    advanced:{
      title:"Periodizing as Advanced",
      intro:"Train in roughly 4-week cycles so you keep gaining without burning out. Hard weeks earn their results only when paired with real recovery.",
      rules:[
        "<b>3 weeks building</b> volume and intensity, then <b>1 lighter deload week</b>.",
        "<b>Rotate the emphasis</b> — a strength-focused block, then an endurance-focused block.",
        "<b>Re-test on the final day</b> of each cycle and reset your targets from the result."
      ]
    }
  };

  function renderMove(level){
    const data = movePlans[level];
    document.getElementById('mv-sum').innerHTML = data.summary.map(s=>`<div><span>${s[0]}</span><b>${s[1]}</b></div>`).join('');
    document.getElementById('mv-grid').innerHTML = data.days.map((d,i)=>`
      <div class="day-card mv-card">
        <div class="day-head"><span class="dnum">Day ${i+1}</span><span class="dtag">${i<7?'Week 1':'Week 2'}</span></div>
        <div class="mv-body">
          <span class="mv-pill ${d.cls}">${d.type}</span>
          <div class="mv-title">${d.title}</div>
          <p class="mv-detail">${d.detail}</p>
          <div class="mv-time">${d.time}</div>
        </div>
      </div>`).join('');
    const p = moveProg[level];
    document.getElementById('mv-prog').innerHTML = `
      <div class="p15">15+</div>
      <div>
        <h4>${p.title} — Day 15 &amp; beyond</h4>
        <p>${p.intro}</p>
        ${p.rules.map(r=>`<div class="rule"><span class="arr">→</span><div>${r}</div></div>`).join('')}
      </div>`;
  }
  document.querySelectorAll('.lvl-tab').forEach(t=>{
    t.addEventListener('click',()=>{
      document.querySelectorAll('.lvl-tab').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      renderMove(t.dataset.level);
    });
  });
  renderMove('beginner');

  /* ---------- BLOOD PRESSURE CHECKER ---------- */
  function checkBP(){
    const s=parseInt(document.getElementById('sys').value,10);
    const d=parseInt(document.getElementById('dia').value,10);
    const res=document.getElementById('bp-res');
    document.querySelectorAll('.bp-row').forEach(r=>r.classList.remove('lit'));
    if(!s||!d){res.textContent='Enter both numbers to highlight your range.';res.style.color='var(--forest-soft)';return;}
    let cat,id,color;
    if(s>180||d>120){cat='Hypertensive crisis — seek medical care now';id='r-crisis';color='#9E2A18';}
    else if(s>=140||d>=90){cat='Hypertension Stage 2';id='r-s2';color='#C44A28';}
    else if(s>=130||d>=80){cat='Hypertension Stage 1';id='r-s1';color='#C2722A';}
    else if(s>=120){cat='Elevated';id='r-elev';color='#A88A1E';}
    else {cat='Normal — nicely done';id='r-normal';color='#4E7A30';}
    res.textContent='→ '+cat;res.style.color=color;
    document.getElementById(id).classList.add('lit');
  }

  /* ---------- LIFESTYLE LEVERS ---------- */
  const levers=[
    "Follow a DASH / Mediterranean-style plate",
    "Keep salt low — watch hidden sodium in packaged food",
    "Eat potassium-rich foods (greens, beans, banana)",
    "Get soluble fiber daily (oats, barley, beans, apples)",
    "Oily fish about twice a week",
    "Choose healthy fats over saturated & fried",
    "Move at least 150 minutes a week",
    "Work toward a healthy weight",
    "Keep alcohol low",
    "Build a daily stress wind-down",
    "Sleep 7–9 hours, consistently",
    "Be smoke-free"
  ];
  const lc=document.getElementById('levers');
  const counter=document.getElementById('lever-count');
  lc.innerHTML=levers.map((t,i)=>`
    <div class="lever" data-i="${i}">
      <span class="box"><svg viewBox="0 0 24 24"><path d="M4 12l5 5L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <span>${t}</span>
    </div>`).join('');
  function updateCount(){
    const n=lc.querySelectorAll('.lever.done').length;
    counter.textContent=`${n} of ${levers.length} habits`;
  }
  lc.querySelectorAll('.lever').forEach(l=>{
    l.addEventListener('click',()=>{l.classList.toggle('done');updateCount();});
  });

  /* ---------- WEEK TABS ---------- */
  document.querySelectorAll('.week-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      document.querySelectorAll('.week-tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.week-panel').forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('week-'+tab.dataset.week).classList.add('active');
    });
  });

  /* ---------- REVEAL ON SCROLL ---------- */
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
