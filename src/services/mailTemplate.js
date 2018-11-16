module.exports = mail => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>I'd like your input!</h3>
          <p>Please answer the following question:</p>
          <p>${mail.body}</p>
        </div>
      </body>
    </html>
  `;
};
