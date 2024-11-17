const { axe, toHaveNoViolations } = require('jest-axe');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

expect.extend(toHaveNoViolations);

test('Formulário de cadastro de pacientes deve ser acessível', async () => {
    const htmlPath = path.join(__dirname, '../views/pacienteView.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document.documentElement.outerHTML; // Corrigindo o parâmetro

    const results = await axe(document);
    expect(results).toHaveNoViolations();
});
