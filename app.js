function resizeCanvas() {
    canvas.width = document.body.clientWidth,
    canvas.height = window.innerHeight
    // canvas.style.width = document.body.clientWidth,
    // canvas.style.height = document.body.clientHeight
}
function generateRandomRed() {
    var t = 60 * Math.random();
    return t > 50 && (t += 350),
    s = Math.random() / 4 + .3,
    v = 1,
    hsv2rgb(t, s, v)
}
function shadeColor2(t, a) {
    var e = parseInt(t.slice(1), 16)
      , i = 0 > a ? 0 : 255
      , n = 0 > a ? -1 * a : a
      , r = e >> 16
      , s = e >> 8 & 255
      , o = 255 & e;
    return "#" + (16777216 + 65536 * (Math.round((i - r) * n) + r) + 256 * (Math.round((i - s) * n) + s) + (Math.round((i - o) * n) + o)).toString(16).slice(1)
}
function blendColors(t, a, e) {
    var i = parseInt(t.slice(1), 16)
      , n = parseInt(a.slice(1), 16)
      , r = i >> 16
      , s = i >> 8 & 255
      , o = 255 & i
      , h = n >> 16
      , c = n >> 8 & 255
      , d = 255 & n;
    return "#" + (16777216 + 65536 * (Math.round((h - r) * e) + r) + 256 * (Math.round((c - s) * e) + s) + (Math.round((d - o) * e) + o)).toString(16).slice(1)
}
function gameLoop() {
    drawGradient(red, blendColors("#FFFFFF", red, .5)),
    drawPoly(polyX, polyY, polyOpacity),
    drawSun(sunColor, sunX, sunY, sunR);
    for (var t = 0; t < rangeHeights.length; t++)
        t % 3 == 0 ? 3 == t ? drawMountainRange(rangeHeights[t], fluctuation, count * (t + 2), .3) : drawMountainRange(rangeHeights[t], fluctuation, count * (t + 2), .2) : t % 3 == 1 ? (drawTreeRange(rangeHeights[t], fluctuation, count * (t + 2)),
        drawLowClouds(rangeHeights[t], fluctuation, count * (t + 2)),
        drawMountainRange(rangeHeights[t] + .01, fluctuation, count * (t + 2), .2),
        drawTreeRange(rangeHeights[t] + .05, fluctuation, count * (t + 3) - 6),
        drawTreeRange(rangeHeights[t] + .03, fluctuation, count * (t + 3) - 12)) : drawLowClouds(rangeHeights[t], fluctuation, count * (t + 2));
    count += .1,
    sunY > 45 ? sunY -= 3 : polyOpacity += .1
}
function init() {
    canvas = document.getElementById("sunset"),
    ctx = canvas.getContext("2d"),
    resizeCanvas(),
    fluctuation = .3 * Math.random() + .05 * canvas.width / 1e3,
    red = "#E14000",
    sunSeed = Math.random(),
    sunColor = "#E60000",
    sunColor = blendColors("#FFFFFF", red, .5),
    sunX = 50,
    sunR = 100,
    sunY = 450,
    count = 0,
    mountainColor = "#555555",
    mountainColor = blendColors(red, "#999999", .5),
    flexHeight = idealHeight / canvas.height,
    drawing = new Image,
    drawing.src = "./../vf2.png",
    drawing.onload = function() {}
    ,
    rangeHeights = [];
    for (var t = 0; 4 > t; t++)
        rangeHeights.push(.9 - (7 - t) / 30);
    canvas.width < 600 && (sunR = 60,
    polyX = -165,
    polyY = -90),
    window.onresize = function() {
        resizeCanvas(),
        canvas.width < 600 && (sunR = 60,
        polyX = -165,
        polyY = -90)
    }
}
function start() {
    init(),
    setInterval(gameLoop, 15)
}
function drawMountainRange(t, a, e, i) {
    var n = canvas.width / 2
      , r = i;
    ctx.beginPath(),
    ctx.moveTo(0, canvas.height);
    for (var s = 0; s <= canvas.width; s += canvas.width / n)
        ctx.lineTo(s, octavePerlin((s + e) / 500, t * canvas.height, 10, 7, .5) * r * canvas.height * 2.5 * t * flexHeight + t * canvas.height);
    ctx.lineTo(canvas.width, canvas.height),
    ctx.closePath(),
    ctx.lineWidth = 1;
    var o = ctx.createLinearGradient(0, canvas.height * t, 0, canvas.height);
    o.addColorStop(0, shadeColor2(mountainColor, 1 / t - .5 - 1)),
    ctx.fillStyle = o,
    ctx.fill(),
    drawMountainShadow(t, a, e, i)
}
function drawMountainShadow(t, a, e, i) {
    var n = canvas.width / 5
      , r = i;
    ctx.beginPath(),
    ctx.moveTo(0, canvas.height);
    for (var s = Math.abs((perlin.noise(a, t * canvas.height, 10) + 1) / 10), o = 0; o <= canvas.width; o += canvas.width / n) {
        var h = (sunX - o) / canvas.width
          , c = h + s;
        ctx.lineTo(o, octavePerlin((o + e + h) / 500, t * canvas.height, 10, 7, .5) * r * canvas.height * 2.5 * t * flexHeight + t * canvas.height + 10 * (Math.sin((o + e) / 20) + 1) + 2 * Math.abs(200 * c - (e + o + 1e3 * t) % 400 * c))
    }
    ctx.lineTo(canvas.width, canvas.height),
    ctx.closePath(),
    ctx.lineWidth = 1;
    var d = ctx.createLinearGradient(0, canvas.height * t, 0, canvas.height);
    d.addColorStop(0, shadeColor2(mountainColor, 1 / t - .53 - 1));
    160 - Math.floor(255 * sunY / canvas.height);
    d.addColorStop(1, shadeColor2(mountainColor, 1 / t - .505 - 1)),
    ctx.fillStyle = d,
    ctx.fill()
}
function drawLowClouds(t, a, e) {
    var i = canvas.width
      , n = .05;
    ctx.beginPath(),
    ctx.moveTo(0, canvas.height);
    for (var r = 0; r <= canvas.width; r += canvas.width / i)
        ctx.lineTo(r, octavePerlin((r + e) / 200, t * canvas.height, 10, 1, .5) * n * canvas.height * 2.5 * t * flexHeight + 10 * Math.abs(Math.sin((r + e) / 20)) * -1 + t * canvas.height * 1.05);
    ctx.lineTo(canvas.width, canvas.height),
    ctx.closePath(),
    ctx.lineWidth = 1;
    var s = ctx.createLinearGradient(0, canvas.height * t, 0, canvas.height);
    s.addColorStop(0, blendColors(shadeColor2(mountainColor, 1 / t - .3 - 1), shadeColor2("#FFFFFF", 1 / t - .3 - 1), .2)),
    ctx.fillStyle = s,
    ctx.fill()
}
function drawTreeRange(t, a, e) {
    var i = canvas.width
      , n = .1;
    ctx.beginPath(),
    ctx.moveTo(0, canvas.height);
    for (var r = 0; r <= canvas.width; r += canvas.width / i) {
        var s = Math.abs(12 - (r + e) % 24);
        s > 1 && 11 > s && r > 5 && r < canvas.width - 5 || ctx.lineTo(r, octavePerlin((r + e) / 200, t * canvas.height * 10, 1, 10, .5) * n * canvas.height * 4 * flexHeight + 6 * Math.abs(12 - (r + e) % 24) + t * canvas.height * 1.04)
    }
    ctx.lineTo(canvas.width, canvas.height),
    ctx.closePath(),
    ctx.lineWidth = 1;
    var o = ctx.createLinearGradient(0, canvas.height * t, 0, canvas.height);
    o.addColorStop(0, blendColors(shadeColor2(mountainColor, 1 / t - .3 - 1), shadeColor2("#002200", 1 / t - .3 - 1), .2));
    160 - Math.floor(255 * sunY / canvas.height);
    ctx.fillStyle = o,
    ctx.fill()
}
function octavePerlin(t, a, e, i, n) {
    for (var r = 0, s = 1, o = 1, h = 0, c = 0; i > c; c++)
        r += perlin.noise(t * s, a * s, e * s) * o,
        h += o,
        o *= n,
        s *= 2;
    return r / h
}
function drawGradient(t, a) {
    var e = ctx.createLinearGradient(0, 0, 0, canvas.width);
    e.addColorStop(0, t),
    e.addColorStop(.4, a),
    ctx.fillStyle = e,
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}
function drawSun(t, a, e, i) {
    ctx.drawImage(drawing, a, e, 2 * i, 2 * i)
}
function drawPoly(t, a, e) {
    ctx.beginPath(),
    ctx.moveTo(t, a),
    ctx.lineTo(t + 550, a),
    ctx.lineTo(t + 325, a + 225),
    ctx.lineTo(t + 275, a + 225),
    ctx.lineTo(t + 225, a + 225),
    ctx.lineTo(t, a),
    ctx.closePath(),
    ctx.fillStyle = "rgba(230,0,0," + e + ")",
    ctx.fill()
}
var hsv2rgb = function(t, a, e) {
    var i, n, r = [];
    if (0 === a)
        i = [e, e, e];
    else
        switch (t /= 60,
        n = Math.floor(t),
        r = [e * (1 - a), e * (1 - a * (t - n)), e * (1 - a * (1 - (t - n)))],
        n) {
        case 0:
            i = [e, r[2], r[0]];
            break;
        case 1:
            i = [r[1], e, r[0]];
            break;
        case 2:
            i = [r[0], e, r[2]];
            break;
        case 3:
            i = [r[0], r[1], e];
            break;
        case 4:
            i = [r[2], r[0], e];
            break;
        default:
            i = [e, r[0], r[1]]
        }
    return "#" + i.map(function(t) {
        return ("0" + Math.round(255 * t).toString(16)).slice(-2)
    }).join("")
}
  , ClassicalNoise = function(t) {
    void 0 == t && (t = Math),
    this.grad3 = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]],
    this.p = [];
    for (var a = 0; 256 > a; a++)
        this.p[a] = Math.floor(256 * t.random());
    this.perm = [];
    for (var a = 0; 512 > a; a++)
        this.perm[a] = this.p[255 & a]
};
ClassicalNoise.prototype.dot = function(t, a, e, i) {
    return t[0] * a + t[1] * e + t[2] * i
}
,
ClassicalNoise.prototype.mix = function(t, a, e) {
    return (1 - e) * t + e * a
}
,
ClassicalNoise.prototype.fade = function(t) {
    return t * t * t * (t * (6 * t - 15) + 10)
}
,
ClassicalNoise.prototype.noise = function(t, a, e) {
    var i = Math.floor(t)
      , n = Math.floor(a)
      , r = Math.floor(e);
    t -= i,
    a -= n,
    e -= r,
    i = 255 & i,
    n = 255 & n,
    r = 255 & r;
    var s = this.perm[i + this.perm[n + this.perm[r]]] % 12
      , o = this.perm[i + this.perm[n + this.perm[r + 1]]] % 12
      , h = this.perm[i + this.perm[n + 1 + this.perm[r]]] % 12
      , c = this.perm[i + this.perm[n + 1 + this.perm[r + 1]]] % 12
      , d = this.perm[i + 1 + this.perm[n + this.perm[r]]] % 12
      , l = this.perm[i + 1 + this.perm[n + this.perm[r + 1]]] % 12
      , u = this.perm[i + 1 + this.perm[n + 1 + this.perm[r]]] % 12
      , v = this.perm[i + 1 + this.perm[n + 1 + this.perm[r + 1]]] % 12
      , g = this.dot(this.grad3[s], t, a, e)
      , m = this.dot(this.grad3[d], t - 1, a, e)
      , p = this.dot(this.grad3[h], t, a - 1, e)
      , f = this.dot(this.grad3[u], t - 1, a - 1, e)
      , x = this.dot(this.grad3[o], t, a, e - 1)
      , M = this.dot(this.grad3[l], t - 1, a, e - 1)
      , w = this.dot(this.grad3[c], t, a - 1, e - 1)
      , b = this.dot(this.grad3[v], t - 1, a - 1, e - 1)
      , C = this.fade(t)
      , y = this.fade(a)
      , S = this.fade(e)
      , H = this.mix(g, m, C)
      , R = this.mix(x, M, C)
      , T = this.mix(p, f, C)
      , k = this.mix(w, b, C)
      , F = this.mix(H, T, y)
      , P = this.mix(R, k, y)
      , I = this.mix(F, P, S);
    return I
}
;
var ctx, canvas, perlin = new ClassicalNoise(Math), count = 0, fluctuation, red, sunColor, sunSeed, sunX, sunY, sunR, drawing, rangeHeights, mountainColor, idealHeight = 680, flexHeight, polyOpacity = 0, polyX = -125, polyY = 0;
