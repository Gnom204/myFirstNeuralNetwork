const trainData = {
    sizeMB: [0.080, 9.000, 0.001, 0.100, 8.000, 5.000, 0.100, 6.000, 0.050, 0.500,
        0.002, 2.000, 0.005, 10.00, 0.010, 7.000, 6.000, 5.000, 1.000, 1.000],
    timeSec: [0.135, 0.739, 0.067, 0.126, 0.646, 0.435, 0.069, 0.497, 0.068, 0.116,
        0.070, 0.289, 0.076, 0.744, 0.083, 0.560, 0.480, 0.399, 0.153, 0.149]
};
const testData = {
    sizeMB: [5.000, 0.200, 0.001, 9.000, 0.002, 0.020, 0.008, 4.000, 0.001, 1.000,
        0.005, 0.080, 0.800, 0.200, 0.050, 7.000, 0.005, 0.002, 8.000, 0.008],
    timeSec: [0.425, 0.098, 0.052, 0.686, 0.066, 0.078, 0.070, 0.375, 0.058, 0.136,
        0.052, 0.063, 0.183, 0.087, 0.066, 0.558, 0.066, 0.068, 0.610, 0.057]
};

const trainTensors = {
    sizeMB: tf.tensor2d(trainData.sizeMB, [20, 1]),
    timeSec: tf.tensor2d(trainData.timeSec, [20, 1])
};
const testTensors = {
    sizeMB: tf.tensor2d(testData.sizeMB, [20, 1]),
    timeSec: tf.tensor2d(trainData.timeSec, [20, 1])
};

const smallFileMB = 1;
const bigFileMB = 100;
const hugeFileMB = 10000;

const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [1], units: 1 }))

model.compile({ optimizer: 'sgd', loss: 'meanAbsoluteError' });
(async function () {
    await model.fit(trainTensors.sizeMB, trainTensors.timeSec, { epochs: 200 })
})
model.evaluate(testTensors.sizeMB, testTensors.timeSec).print()
const avgDelaySec = tf.mean(trainData.timeSec);
avgDelaySec.print();

tf.mean(tf.abs(tf.sub(testData.timeSec, 0.295))).print()
const modelLearn = (size) => {
    return model.predict(tf.tensor2d([[size]]))
}

function updateSize() {
    var file = document.getElementById("uploadInput").files[0],
        ext = "не определилось",
        parts = file.name.split('.');
    if (parts.length > 1) ext = parts.pop();
    let size = Math.round(file.size / 8 / 1024 / 1024 * 1000) / 1000;
    let speedOfDownload = modelLearn(size)
    document.getElementById("e-fileinfo").innerHTML = [
        "Размер файла: " + size + " MB",
        "Расширение: " + ext,
        "MIME тип: " + file.type,
        "Время затраченное на загрузку файла: " + speedOfDownload.toString().replace(/[^(0-9)(.)]/g, '') + "s"
    ].join("<br>");
}

document.getElementById('uploadInput').addEventListener('change', updateSize);



setInterval((function () {
    var rand1 = Math.floor(Math.random() * 1000);
    var rand2 = Math.floor(Math.random() * 1000);
    var rand3 = Math.floor(Math.random() * 1000);
    var rand4 = Math.floor(Math.random() * 1000);

    var box = document.getElementById('box');
    var dotClone = document.getElementById('dot');
    let dot = document.createElement('div');
    dot.className = 'dot'
    dot.style.left = rand1 + 'px';
    dot.style.top = rand2 + 'px';
    setTimeout((() => {
        dot.style.left = rand3 + 'px';
        dot.style.top = rand4 + 'px';
    }), 1000)
    document.body.appendChild(dot)
    setTimeout((() => {
        document.body.removeChild(dot)
    }), 7000)
}), 1000)