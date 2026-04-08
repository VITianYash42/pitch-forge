import { Compass, Handshake, MapPin, Send } from 'lucide-react';

const channelRules = [
  {
    test: /student|college|campus|undergrad|university/i,
    channels: ['College communities', 'Campus WhatsApp/Discord groups', 'Student clubs and hackathons'],
    offer: 'Offer a student beta with a simple monthly starter plan.',
  },
  {
    test: /developer|engineer|programmer|tech/i,
    channels: ['GitHub', 'Reddit developer forums', 'Indie Hacker/Dev Discord communities'],
    offer: 'Lead with time saved and a free trial to first paid conversion.',
  },
  {
    test: /manager|founder|owner|business|smb|startup/i,
    channels: ['LinkedIn outreach', 'Founder communities', 'Local startup meetups'],
    offer: 'Pitch ROI and convert via a short pilot engagement.',
  },
  {
    test: /teacher|educator|coach|bootcamp/i,
    channels: ['Educator communities', 'Bootcamp mentors', 'EdTech Slack groups'],
    offer: 'Bundle team access and onboarding support for first contracts.',
  },
];

function getReachPlan(persona, painPoint) {
  const context = `${persona || ''} ${painPoint || ''}`;
  const match = channelRules.find((rule) => rule.test.test(context));

  if (match) {
    return {
      channels: match.channels,
      offer: match.offer,
    };
  }

  return {
    channels: ['LinkedIn niche search', 'Relevant Reddit communities', 'Micro-communities on Discord/Slack'],
    offer: 'Start with a problem-focused demo and a lightweight paid pilot.',
  };
}

function urgencyFromWillingness(level) {
  if (level === 'High') return 'Hot lead segment';
  if (level === 'Medium') return 'Warm lead segment';
  return 'Awareness segment';
}

export default function CustomerReachCard({ users = [] }) {
  const plans = users.slice(0, 3).map((user) => {
    const plan = getReachPlan(user.persona, user.pain_point);
    return {
      ...user,
      ...plan,
      urgency: urgencyFromWillingness(user.willingness_to_pay),
    };
  });

  return (
    <section
      id="reach"
      className="scroll-mt-32 rounded-2xl border border-zinc-800 bg-[#111111]/90 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#e53e3e]/50 hover:shadow-[0_4px_20px_rgba(229,62,62,0.1)]"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-widest text-zinc-400">Where To Reach Customers</p>
        <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
          Potential Sales Channels
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <article key={`${plan.persona}-${index}`} className="rounded-xl border border-zinc-800 bg-[#0d0d0d] p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold tracking-wide text-zinc-100">{plan.persona}</h3>
              <span className="rounded-full border border-[#e53e3e]/35 bg-[#e53e3e]/10 px-2.5 py-0.5 text-[11px] text-[#ff9b9b]">
                {plan.urgency}
              </span>
            </div>

            <div className="space-y-3 text-sm text-zinc-300">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 text-[#e53e3e]" />
                <div>
                  <p className="mb-1 text-[11px] uppercase tracking-wider text-zinc-500">Where to find</p>
                  <ul className="space-y-1 leading-relaxed">
                    {plan.channels.map((channel) => (
                      <li key={channel}>- {channel}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Compass size={14} className="mt-0.5 text-[#e53e3e]" />
                <div>
                  <p className="mb-1 text-[11px] uppercase tracking-wider text-zinc-500">Outreach angle</p>
                  <p className="leading-relaxed">{plan.pain_point}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Handshake size={14} className="mt-0.5 text-[#e53e3e]" />
                <div>
                  <p className="mb-1 text-[11px] uppercase tracking-wider text-zinc-500">First sales move</p>
                  <p className="leading-relaxed">{plan.offer}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-zinc-800 bg-[#0d0d0d] p-4">
        <div className="flex items-center gap-2 text-zinc-200">
          <Send size={14} className="text-[#e53e3e]" />
          <p className="text-xs uppercase tracking-widest text-zinc-400">Suggested Sales Sprint</p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
          Week 1: Contact 20 prospects across the listed channels. Week 2: Run 5 demos and collect objections.
          Week 3: Close 1 to 3 pilot customers with a discounted early-adopter plan.
        </p>
      </div>
    </section>
  );
}
