from svg_generator import MakeSVG
import numpy as np

class WaveMaker():
    def __init__(self, height=500, width=500, background = True):
        self.img = MakeSVG(height=height, width=width, background=background)
        self.height = height
        self.width = width

    def draw_sine_wave(self, num_points = 100, start_x = 0, start_y = 0, amplitude = 100):
        # sinewave

        angle_step = 2*np.pi / num_points
        length_step = self.width / num_points
        points = [(start_x, start_y)]
        x = start_x
        y = start_y

        for i in range(0, num_points):
            angle = angle_step*i
            x = x+length_step
            y = np.sin(angle)*amplitude + start_y
            points.append((x, y))

        self.img.draw_line(points)
        return


if __name__ == '__main__':
    Maker = WaveMaker()
    Maker.draw_sine_wave(start_y = Maker.height/2)
    Maker.img.save_and_view()