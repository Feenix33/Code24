# dijkstra.py
# implementation of the algo from w3school.com

import sys


class Graph:
    def __init__(self, size):
        self.adj_matrix = [[0] * size for _ in range(size)]
        self.size = size
        self.vertex_data = [''] * size

    def add_edge(self, u, v, weight):
        if 0 <= u <= self.size and 0 <= v < self.size:
            self.adj_matrix[u][v] = weight
            self.adj_matrix[v][u] = weight # for undirected
    def add_vertex_data(self, vertex, data):
        if 0 <= vertex < self.size:
            self.vertex_data[vertex] = data

    def dijkstra(self, start_vertex_data):
        start_vertex = self.vertex_data.index(start_vertex_data)
        distances = [float('inf')] * self.size
        distances[start_vertex] = 0
        visited = [False] * self.size

        for _ in range(self.size):
            min_distance = float('inf')
            u = None
            for i in range(self.size):
                if not visited[i] and distances[i] < min_distance:
                    min_distance = distances[i]
                    u = i
            if u is None:
                break
            
            visited[u] = True

            for v in range(self.size):
                if self.adj_matrix[u][v] != 0 and not visited[v]:
                    alt = distances[u] + self.adj_matrix[u][v]
                    if alt < distances[v]:
                        distances[v] = alt

        return distances

    def get_path(self, predecessors, start_vertex, end_vertex):
        path = []
        current = self.vertex_data.index(end_vertex)
        while current is not None:
            path.insert(0, self.vertex_data[current])
            current = predecessors[current]
            if current == self.vertex_data.index(start_vertex):
                path.insert(0, start_vertex)
                break;
        return '->'.join(path)

    def find_path(self, start_vertex_data, end_vertex_data):
        # find the shortest path between two points with dijkstra
        start_vertex = self.vertex_data.index(start_vertex_data)
        end_vertex = self.vertex_data.index(end_vertex_data)
        distances = [float('inf')] * self.size
        predecessors = [None] * self.size
        distances[start_vertex] = 0
        visited = [False] * self.size

        for _ in range(self.size):
            min_distance = float('inf')
            u = None
            for i in range(self.size):
                if not visited[i] and distances[i] < min_distance:
                    min_distance = distances[i]
                    u = i
            if u is None or u == end_vertex:
                print (f"Breaking out of loop. Current verteix: {self.vertex_data[u]}")
                print (f"Disances: {distances}")
                break
            
            visited[u] = True
            print (f"Visited vertex: {self.vertex_data[u]}")

            for v in range(self.size):
                if self.adj_matrix[u][v] != 0 and not visited[v]:
                    alt = distances[u] + self.adj_matrix[u][v]
                    if alt < distances[v]:
                        distances[v] = alt
                        predecessors[v] = u

        return distances[end_vertex], self.get_path(predecessors, start_vertex_data, end_vertex_data)

def test_case():
    #
    #                 +------- 5 -------+
    #  A --- 3 --- C ---2 -- B --2-- F
    #  |\          |\                |
    #  |4\4       4| \ 5            5|
    #  |  \ /------+  \ /------------+
    #  D-2-E-----5-----G
    #
    #
    g = Graph(7)

    g.add_vertex_data(0, 'A')
    g.add_vertex_data(1, 'B')
    g.add_vertex_data(2, 'C')
    g.add_vertex_data(3, 'D')
    g.add_vertex_data(4, 'E')
    g.add_vertex_data(5, 'F')
    g.add_vertex_data(6, 'G')

    g.add_edge(3, 0, 4) # D - A wt 5
    g.add_edge(3, 4, 2) # D - E wt 2
    g.add_edge(0, 2, 3) # A - C wt 3
    g.add_edge(0, 4, 4) # A - E wt 4
    g.add_edge(4, 2, 4) # E - C wt 4
    g.add_edge(4, 6, 5) # E - G wt 5
    g.add_edge(2, 5, 5) # C - F wt 5
    g.add_edge(2, 1, 2) # C - B wt 2
    g.add_edge(1, 5, 2) # B - F wt 2
    g.add_edge(6, 5, 5) # G - F wt 5

    print ("Dijkstra'a Algorithm starting from vertex D:")
    distances = g.dijkstra('D')
    for i,d in enumerate(distances):
        print (f"Distance from D to {g.vertex_data[i]}: {d}")


    distance, path = g.find_path('D', 'F')
    print (f"Path: {path}, Distance: {distance}")

    distance, path = g.find_path('C', 'D')
    print (f"Path: {path}, Distance: {distance}")

def main():
    test_case()

if __name__ == "__main__":
    main()
    sys.exit()
