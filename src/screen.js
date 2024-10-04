const { Input, NumberPrompt, Select } = require('enquirer');
const { Table } = require('console-table-printer');

let rules = [];

function welcomeScreen() {
  console.log('====================================');
  console.log('======= Program Cat Kitty ==========');
  console.log('====================================');
}

async function selectProgramScreen() {
    try {
        let isExit = false;

        while (!isExit) {
            console.log('\n');
            const selectedProgram = await new Select({
                name: 'program',
                message: 'Silahkan pilih program yang ingin dijalankan :',
                choices: [
                  '1. Masukkan angka maksimal (n)',
                  '2. Tambah Rules',
                  '3. Lihat Rules',
                  '4. Keluar',
                ],
            }).run();

            switch (selectedProgram) {
                case '1. Masukkan angka maksimal (n)':
                    await printNumbers();
                    break;
                
                case '2. Tambah Rules':
                    await addRule();
                    break;

                case '3. Lihat Rules':
                    await lihatRules();
                    break;

                case '4. Keluar':
                    isExit = true;
                    break;

                default:
                    break
            }
        }

        exitScreen()
    } finally {
        return;
    }
}

async function printNumbers() {
    console.clear();
    console.log('Masukkan angka maksimal (n)\n');

    try {
        const n = await new NumberPrompt({
            name: 'n',
            message: 'Masukkan nilai n :',
            float: false,
            initial: 1,
            validate: function (value) {
              if (value <= 0) {
                this.value = undefined;
                return 'nilai n minimal 1!';
              } else {
                return true;
              }
            },
        }).run();

        outerLoop:
        for (let i = 1; i <= n; i++) {
            if (i !== 1) process.stdout.write(', ');
            for (let rule of rules) {
                if (i % rule.divisor === 0) {
                    process.stdout.write(rule.output);
                    continue outerLoop
                }
            }
    
            if (i % 15 == 0) {
                process.stdout.write('catKitty');
                continue;
            } else if (i % 5 == 0) {
                process.stdout.write('kitty');
                continue;
            } else if (i % 3 == 0) {
                process.stdout.write('cat');
                continue;
            } else {
                process.stdout.write(`${i}`);
            }
        }
        console.log()
        console.log('\nProgram berhasil!.');
    } catch {
        console.log('Gagal menampilkan hasil!.');
    }
}

async function addRule() {
    console.clear();
    console.log('Tambah Rule\n');

    try {
        const divisor = await new NumberPrompt({
            name: 'divisor',
            message: 'Masukkan nilai divisor (pembagi) :',
            float: false,
            initial: 1,
            validate: function (value) {
              if (value <= 0) {
                this.value = undefined;
                return 'Nilai divisor minimal 1!';
              } else {
                return true;
              }
            },
        }).run();

        const namaOutput = await new Input({
            name: 'namaOutput',
            message: 'Nama Output:',
            initial: 'Masukkan nama Output',
        }).run();

        if (rules.length == 0) {
            rules.push({ divisor: divisor, output: namaOutput }); // Jika aturan baru memiliki prioritas terendah
        }
    
        for (let i = 0; i < rules.length; i++) {
            if (divisor > rules[i].divisor) {
                rules.splice(i, 0, { divisor: divisor, output: namaOutput });
                break;
            }
        }
        console.log('Berhasil menambahkan rule!.');
    } catch {
        console.log('Gagal menambahkan rule!.');
    }
}

async function lihatRules() {
    console.clear();
    try { 
        if (rules.length) {
            const table = new Table({
                columns: [
                    { name: 'No', alignment: 'left' },
                    { name: 'Divisor', alignment: 'left' },
                    { name: 'Output Name', alignment: 'left' },
                ],
            });
    
            rules.forEach((rule, index) => {
                table.addRow({
                    No: index + 1,
                    Divisor: rule.divisor,
                    'Output Name': rule.output, 
                })
            });
            table.printTable();
        } else {
            console.log('Tidak rules tambahan!');
        }
    } catch {
        console.log('Gagal menampilkan rules!');
    }
}

function exitScreen() {
    console.clear();
    console.log('\nAnda telah memilih menu keluar.');
    console.log('Terima kasih telah menggunakan program ini.');
}
  
module.exports = { welcomeScreen, selectProgramScreen };