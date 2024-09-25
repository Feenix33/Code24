# ###########################################################################
# PygFlowers
# Draw some flower with pygame
# ###########################################################################

import pygame, sys
from pygame.locals import *
# pygame.locals has constants
import random;

PI = 3.141592
FLOWERS_COUNT = 20
FLOWER_RADMAX = 200
FLOWER_RADMIN =  20
WIDTH = 800
HEIGHT = 500

# ###########################################################################


def deg2rad(d):
    return d*PI/180

def randomColor():
    return (random.randrange(255),random.randrange(255),random.randrange(255))

def randomLightColor():
    return (random.randrange(128,255),random.randrange(128,255),random.randrange(128,255))

def randomDarkColor():
    return (random.randrange(16,155),random.randrange(16,155),random.randrange(16,155))

def drawDaisy(screen, x, y, sd, crayons=None, probDrawPetals=0.5, probDrawOut=0.5):
    nPetals = random.randint(3,7)
    surf = pygame.Surface((sd, sd))
    pygame.draw.rect(surf, (1,1,1), (0,0,sd,sd)) #make black and skip?
    surf.set_colorkey((1,1,1))
    pR = (sd * 0.25)
    rotAng = 360/nPetals
    clrs = crayons
    if clrs == None:
        clrs = [randomLightColor(),randomLightColor(),randomLightColor()]

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


def drawPansy(screen, x, y, sd, clrs):
    surf = pygame.Surface((sd, sd))
    pygame.draw.rect(surf, (1,1,1), (0,0,sd,sd)) #make black and skip?
    surf.set_colorkey((1,1,1))
    pR = (sd * 0.25)
    ctr = pygame.Vector2(sd/2, sd/2)
    v = pygame.Vector2.from_polar((pR, 0))
    ang = 0
    for n in range(3):
        c2 = ctr+v+pygame.Vector2(-pR,-pR)
        pygame.draw.circle(surf, (0, 155,0), ctr+v, pR)
        pygame.draw.arc(surf, clrs[1], (c2,(pR*2,pR*2)), ang-2*PI/3, ang+2*PI/3, 2)
        pygame.draw.line(surf, (1,1,1), ctr, ctr+v)
        v = v.rotate(120)
        ang -= (120/180)*PI

    pygame.draw.circle(surf, clrs[2], ctr, pR/2) #center
    screen.blit(surf, (x,y))

def drawFlower(screen, x, y, sd, clrs):
    pR = (sd * 0.25)
    ctr = pygame.Vector2(sd/2, sd/2)
    v = pygame.Vector2.from_polar((pR, 0))

    surf = pygame.Surface((sd, sd))
    pygame.draw.rect(surf, (1,1,1), (0,0,sd,sd))
    surf.set_colorkey((1,1,1))

    pygame.draw.circle(surf, clrs[1], v+ctr, pR)
    pygame.draw.line(surf, (0,0,0), ctr, v+ctr)

    v = v.rotate(120)
    pygame.draw.circle(surf, clrs[1], v+ctr, pR)
    pygame.draw.line(surf, (0,0,0), ctr, v+ctr)

    v = v.rotate(120)
    pygame.draw.circle(surf, clrs[1], v+ctr, pR)
    pygame.draw.line(surf, (0,0,0), ctr, v+ctr)

    pygame.draw.circle(surf, (255,0,0), ctr, 2) # dot at center

    #pygame.draw.circle(surf, clrs[1], v2+ctr, pR)
    #pygame.draw.circle(surf, (255,255,0), v2+ctr, 2)

    screen.blit(surf, (x,y))

def main():
    pygame.init()

    screen = pygame.display.set_mode((800, 500))
    pygame.display.set_caption("pygame Flowers")

    gDone = False
    clrBackground = (128,128,128)
    aColor = [randomLightColor(),randomLightColor(),randomLightColor()]

    doLoop = True

    while not gDone:
        for event in pygame.event.get():
            if event.type == QUIT:
                gDone = True
            if event.type == MOUSEBUTTONUP:
                doLoop = True
            if event.type == KEYUP:
                if event.key == pygame.K_a:
                    print("a pressed")
                if event.key == pygame.K_ESCAPE:
                    gDone = True
                else:
                    doLoop = True


        # draw loop
        if doLoop:
            screen.fill(clrBackground)
            #drawFlower(screen, 400, 250, 100, aColor)
            #drawPansy(screen, 100, 50, 100, aColor)
            for n in range(FLOWERS_COUNT):
                xf = random.randint(0, WIDTH)
                yf = random.randint(0, HEIGHT)
                rf = random.randint(FLOWER_RADMIN, FLOWER_RADMAX)
                drawDaisy(screen, xf, yf, rf)
            pygame.display.flip()
            doLoop = False
    
  
    pygame.quit()
    sys.exit()

# ###########################################################################
if __name__ == "__main__":
    main()
