export default class Segment {
  constructor (id, points = []) {
    this.id = id
    this.points = points
  }

  pushPoint (point) {
    this.points.push(point)
  }

  draw (c, scl, p) {
    if (this.points.length < 2) {
      return
    }

    p.push()
    p.noFill()
    p.stroke(c.r, c.g, c.b)
    p.strokeWeight(5)
    p.beginShape()
    for (let i = 0, l = this.points.length; i < l; ++i) {
      let curr = this.points[i]
      p.curveVertex(curr.x, curr.y)
    }
    p.endShape()
    p.pop()

  }

  toJSON () {
    return { id: this.id, points: this.points }
  }
}