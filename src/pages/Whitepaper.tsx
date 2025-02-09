
import Navbar from "@/components/layout/Navbar";

const Whitepaper = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-16 prose prose-invert">
        <h1 className="text-4xl font-bold mb-8">Pawns: Play-to-Earn Chess Platform</h1>
        <h2 className="text-3xl font-semibold mb-6">Whitepaper</h2>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Introduction</h3>
          <h4 className="text-xl font-semibold mb-3">The Timeless Appeal of Chess</h4>
          <p className="mb-4">
            Chess, with a history spanning over 1500 years, has captivated minds across cultures and generations. Its blend of strategy, foresight, and intellect has made it a universal symbol of cognitive prowess. Today, chess thrives in the digital age, attracting traditional enthusiasts and new players seeking intellectual challenges.
          </p>
          <p className="mb-4">
            However, despite its global popularity, chess remains undermonetized for most players. While elite grandmasters earn from sponsorships and tournaments, millions of skilled players receive no rewards for their time and expertise. Pawns aims to change that.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Project Vision</h3>
          <p className="mb-4">
            Pawns revolutionizes the chess experience by integrating blockchain technology, creating a play-to-earn platform where players can monetize their skills. By leveraging Lichess, the leading open-source chess platform, for game management and MetaMask for cryptocurrency transactions, we create a seamless, rewarding environment for chess enthusiasts.
          </p>
          <p className="mb-4">
            But we don't stop there—we want to spice chess up by adding competitive staking and rewards, making every match more engaging. Whether you're a casual player looking for a fun challenge or a serious competitor aiming to earn from your skills, Pawns makes chess more thrilling and rewarding.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Objectives</h3>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              <strong>Monetization for Players</strong>
              <p>Enable players of all levels to earn rewards based on performance, making chess both an intellectual challenge and an earning opportunity.</p>
            </li>
            <li className="mb-2">
              <strong>Blockchain Integration</strong>
              <p>Leverage the transparency and security of blockchain for in-game transactions, staking, and rewards distribution.</p>
            </li>
            <li className="mb-2">
              <strong>Enhanced Chess Experience</strong>
              <p>Make chess more exciting by introducing optional betting mechanics, giving players the chance to stake tokens and increase the stakes of each game.</p>
            </li>
            <li className="mb-2">
              <strong>Community Engagement</strong>
              <p>Foster a vibrant Web3 chess community where players compete, collaborate, and grow together, enhancing the overall chess ecosystem.</p>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Target Audience</h3>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              <strong>Chess Enthusiasts</strong>
              <p>Casual players, club players, and professionals looking to monetize their chess skills.</p>
            </li>
            <li className="mb-2">
              <strong>Crypto Community</strong>
              <p>Web3 enthusiasts interested in platforms that combine gaming with decentralized finance.</p>
            </li>
            <li className="mb-2">
              <strong>Gamers</strong>
              <p>Players seeking engaging play-to-earn experiences with high skill expression.</p>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Platform Overview</h3>
          <h4 className="text-xl font-semibold mb-3">Gameplay & Lichess Integration</h4>
          <p className="mb-4">
            Pawns fully integrates with Lichess, the world's leading open-source chess platform, ensuring:
          </p>
          <ul className="list-none pl-6 mb-4">
            <li className="flex items-center mb-2">
              <span className="text-green-500 mr-2">✅</span>
              A high-quality, competitive environment
            </li>
            <li className="flex items-center mb-2">
              <span className="text-green-500 mr-2">✅</span>
              Access to fair matchmaking and rating systems
            </li>
            <li className="flex items-center mb-2">
              <span className="text-green-500 mr-2">✅</span>
              Smooth game management via the Lichess API
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Blockchain & Tokenomics</h3>
          <h4 className="text-xl font-semibold mb-3">AMB Token Economy</h4>
          <p className="mb-4">Pawns uses AMB tokens (AirDAO) for:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Match staking: Players can stake tokens before games.</li>
            <li>Wagering mechanics: Users can bet standard amounts (10, 30, or 50 AMB) or manually enter custom stakes.</li>
            <li>Reward distribution: Winners earn AMB tokens based on Elo changes, ensuring fair, skill-based rewards.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Security & Fair Play</h3>
          <ul className="list-none pl-6 mb-4">
            <li className="mb-4">
              <strong>Secure Wallet Integration</strong>
              <div className="flex items-center mb-1">
                <span className="text-green-500 mr-2">✅</span>
                MetaMask for safe transactions.
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                Instant payouts via smart contracts.
              </div>
            </li>
            <li className="mb-4">
              <strong>Fair Play with Lichess</strong>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                Lichess handles all anti-cheating measures, ensuring fair games without manipulation.
              </div>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Community & Growth</h3>
          <p className="mb-4">
            Pawns is more than just a platform—it's a movement. We will grow and engage our community through:
          </p>
          <ul className="list-none pl-6 mb-4">
            <li className="mb-2">
              <span className="mr-2">🏆</span>
              <strong>Regular Tournaments</strong>
              <p>Compete in high-stakes events with big rewards.</p>
            </li>
            <li className="mb-2">
              <span className="mr-2">📚</span>
              <strong>Educational Resources</strong>
              <p>Learn chess strategies and blockchain fundamentals.</p>
            </li>
            <li className="mb-2">
              <span className="mr-2">🎉</span>
              <strong>Dynamic Community Features</strong>
              <p>Chat, join guilds, and climb leaderboards.</p>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Conclusion</h3>
          <p className="mb-4">
            Pawns bridges the gap between the timeless game of chess and the innovative world of blockchain. By offering a thrilling, skill-based play-to-earn experience, Pawns transforms chess from a game of intellect into a competitive, rewarding financial opportunity.
          </p>
          <p className="mb-4">
            With Lichess powering the games, blockchain securing transactions, and staking making each match exciting, Pawns is the future of competitive chess.
          </p>
          <p className="text-center font-semibold">
            🔗 Join the revolution at Pawns. Play. Earn. Win.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Whitepaper;

