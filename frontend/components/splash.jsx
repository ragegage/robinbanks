const React = require('react');

 const Splash = () => (
  <div>
    <section className="section white">
      <h1>Robinbanks</h1>
      <h2>Look up stock prices for free.</h2>
      <h2>Stop paying for access to information.</h2>
      <h3>Robinbanks is available now!</h3>
      <h3>Signing up takes less than one minute.</h3>
      <figure><img src="/clock.png" /></figure>
    </section>
    <section className="section green">
      <h2>Say goodbye to your old trading platform</h2>
      <h2>And hello to Robinbanks</h2>
      <h3>Robinbanks started with the idea that one person could help make real-time stock data available to the world.</h3>
      <h3>Our limited team means significantly less overhead - we cut out the lard that makes other trading platforms costly.</h3>
      <h3>By focusing only on our core features, we can support dozens of users at a time.</h3>
      <figure><img src="/map.png" /></figure>
    </section>
    <section className="section black">
      <figure><img src="/lock.png" /></figure>
      <h2>User Authentication</h2>
      <h2>Using the latest technologies</h2>
      <h3>As one of the only trading platforms that has never been hacked (as far as we know), Robinbanks puts your security first.</h3>
      <h3>With our unique "demo user" functionality, you can try out the site without revealing your personal information.</h3>
      <p>Any trades made, through Robinbanks or otherwise, may lose money. Robinbanks takes no responsibility for any risks you incur.</p>
    </section>
    <section className="section white">
      <h2>Stay on top of your portfolio</h2>
      <h2>Anytime. Anywhere.</h2>
      <figure><img src="/price.png" /></figure>
      <h2>Realtime data</h2>
      <p>In the stock market, a fraction of a second can mean millions of dollars gained or lost. Robinbanks uses near-realtime data to ensure that you will have the best chance to be on the winning side of any trade.</p>
      <p>Our team has built soft-realtime instant messaging apps, so we know what's involved in maintaining a sophisticated server-side architecture.</p>
    </section>
    <section className="section green">
      <h2>We're a one-man team with a deep affinity for Robinhood.</h2>
      <p>This project was created to try to build a site similar to Robinhood's. The trading feature was dropped in favor of easier-to-access charting and news aggregation features.</p>
      <p><a href="https://github.com/ragegage/" target="_blank">Learn more about us.</a></p>
    </section>
  </div>
);

 module.exports = Splash;
