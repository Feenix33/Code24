# ###########################################################################
# pygCircles
# Draw some space filling circles
# ###########################################################################

import pygame, sys
from pygame.locals import * # pygame.locals has constants
import random;

PI = 3.141592
WIDTH = 800
HEIGHT = 500
BORDER = 5

gCircles = []
CIRCLES_COUNT = 40
CIRCLE_RADIUS = 10
CIRCLE_GROW = 2.9
CIRCLE_TRIES = 18
CIRCLE_FLOWER = 2.0
DEAD_LIMIT = 100
gDead_count = 0
gDrawFlowers = False

# ###########################################################################

class Circ:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.r = CIRCLE_RADIUS
        self.clr = randomColor()
        self.alive = True
    def show(self, surf):
        pygame.draw.circle(surf, self.clr, (self.x, self.y), self.r)
    def grow(self):
        if self.alive:
            if self.x-self.r > 0 and self.x+self.r < WIDTH and self.y-self.r > 0 and self.y+self.r < HEIGHT: 
                self.r += CIRCLE_GROW
            else:
                self.alive = False

# ###########################################################################

def drawDaisy(screen, x, y, sd, crayons=None, probDrawPetals=0.5, probDrawOut=0.5):
    nPetals = random.randint(3,7)
    surf = pygame.Surface((sd, sd))
    pygame.draw.rect(surf, (1,1,1), (0,0,sd,sd)) #make black and skip?
    surf.set_colorkey((1,1,1))
    pR = (sd * 0.25)
    rotAng = 360/nPetals
    clrs = crayons
    if clrs == None:
        clrs = [randomLightColorAlpha(),randomLightColorAlpha(),randomLightColorAlpha()]

    ctr = pygame.Vector2(sd/2, sd/2)
    bDrawPetals = random.random() < 0.5
    if not bDrawPetals:
        bDrawOutline = True
    else:
        bDrawOutline = random.random() < 0.5

    ang = 0
    arcAng = (270-rotAng)*PI/180
    v = pygame.Vector2.from_polar((pR, ang))
    if bDrawPetals:
        for n in range(nPetals):
            c2 = ctr+v+pygame.Vector2(-pR,-pR)
            pygame.draw.circle(surf, clrs[0], ctr+v, pR)
            v = v.rotate(rotAng)

    if bDrawOutline:
        for n in range(nPetals):
            c2 = ctr+v+pygame.Vector2(-pR,-pR)
            bgnAng = deg2rad(ang- rotAng)
            endAng = deg2rad(ang+ rotAng)
            pygame.draw.arc(surf, clrs[1], (c2,(pR*2,pR*2)), bgnAng, endAng, 2)
            pygame.draw.line(surf, clrs[1], ctr, ctr+v)
            ang -= rotAng
            v = v.rotate(rotAng)

    pygame.draw.circle(surf, clrs[2], ctr, pR/2) #center
    screen.blit(surf, (x,y))

def deg2rad(d):
    return d*PI/180

def randomColor():
    return (random.randrange(255),random.randrange(255),random.randrange(255))

def randomLightColor():
    return (random.randrange(128,255),random.randrange(128,255),random.randrange(128,255))

def randomLightColorAlpha():
    return (random.randrange(128,255),random.randrange(128,255),random.randrange(128,255),random.randrange(128,255))

def randomDarkColor():
    return (random.randrange(16,155),random.randrange(16,155),random.randrange(16,155))


def isGoodSpot(x, y):
    global gCircles
    pt = pygame.math.Vector2(x,y)
    for circle in gCircles:
        cctr = pygame.math.Vector2(circle.x,circle.y)
        dist = pygame.math.Vector2.distance_to(pt,cctr)
        if dist < CIRCLE_RADIUS+circle.r+2:
            return False
    return True

def init_simulation():
    global gCircles
    global gDead_count
    global gDrawFlowers
    gCircles = []
    gDead_count = 0
    gDrawFlowers = False
    for n in range(CIRCLES_COUNT):
        x = random.randint(BORDER,WIDTH-BORDER)
        y = random.randint(BORDER,HEIGHT-BORDER)
        if isGoodSpot(x,y):
            gCircles.append(Circ(x,y))


def grow_circles():
    global gCircles
    for n in range(len(gCircles)-1):
        for j in range(n, len(gCircles)):
            if n != j:
                nctr = pygame.math.Vector2(gCircles[n].x, gCircles[n].y)
                jctr = pygame.math.Vector2(gCircles[j].x, gCircles[j].y)
                dist = pygame.math.Vector2.distance_to(nctr,jctr)
                if dist <= (gCircles[n].r + gCircles[j].r+2):
                    gCircles[n].alive = False
                    gCircles[j].alive = False

def count_alive_circles():
    global gCircles
    count = 0
    for circle in gCircles:
        if circle.alive: count += 1
    return count

# ###########################################################################


def deg2rad(d):
    return d*PI/180

def randomColor():
    return (random.randrange(255),random.randrange(255),random.randrange(255))

def randomLightColor():
    return (random.randrange(128,255),random.randrange(128,255),random.randrange(128,255))

def randomDarkColor():
    return (random.randrange(16,155),random.randrange(16,155),random.randrange(16,155))


def main():
    global gCircles
    global gDead_count
    global gDrawFlowers

    pygame.init()

    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("pygame Circles")

    gDone = False
    doLoop = True
    clrBackground = (128,128,128)

    init_simulation()

    while not gDone:
        for event in pygame.event.get():
            if event.type == QUIT:
                gDone = True
            if event.type == MOUSEBUTTONUP:
                init_simulation()
                doLoop = True
            if event.type == KEYUP:
                #if event.key == pygame.K_a: print("a pressed")
                if event.key == pygame.K_ESCAPE:
                    gDone = True
                else:
                    init_simulation()
                    doLoop = True

        if doLoop:
            for t in range(CIRCLE_TRIES):
                x = random.randint(BORDER,WIDTH-BORDER)
                y = random.randint(BORDER,HEIGHT-BORDER)
                if isGoodSpot(x,y):
                    gCircles.append(Circ(x,y))

            if count_alive_circles() == 0:
                gDead_count += 1
                if gDead_count > DEAD_LIMIT:
                    doLoop = False
                    gDrawFlowers = True

            # draw loop
            screen.fill(clrBackground)
            for circle in gCircles:
                if gDrawFlowers:
                    drawDaisy(screen, circle.x, circle.y, circle.r*CIRCLE_FLOWER)
                else:
                    circle.show(screen)

            pygame.display.flip()
            grow_circles()
            for circle in gCircles:
                circle.grow()
  
    pygame.quit()
    sys.exit()

# ###########################################################################
if __name__ == "__main__":
    main()

