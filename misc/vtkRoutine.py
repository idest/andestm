import vtk

reader = vtk.vtkXMLImageDataReader()
reader.SetFileName("block.vti")
reader.Update()

print reader.GetOutput()
array = reader.GetOutput().GetPointData().GetArray(0) #.GetRange()
reader.GetOutput().GetPointData().SetScalars(array)
#print reader.GetOutput().GetClassName()
#print reader.GetOutput().GetPointData().GetScalars()
#print reader.GetOutput().GetScalarRange()
#print reader.GetOutput().GetBounds()
#reader.GetOutput().SetDimensions(176,101,1)
#reader.GetOutput().AllocateScalars(vtk.VTK_DOUBLE, 1)

#imageDataGeometryFilter = vtk.vtkImageDataGeometryFilter()
#imageDataGeometryFilter.SetInputConnection(reader.GetOutputPort())
#imageDataGeometryFilter.Update()

#triangles = vtk.vtkDataSetTriangleFilter()
#triangles.SetInputConnection(reader.GetOutputPort())
#triangles.Update()

#warp = vtk.vtkWarpScalar()
#warp.SetInputConnection(triangles.GetOutputPort())
#warp.Update()

mapper = vtk.vtkDataSetMapper()
#mapper = vtk.vtkPolyDataMapper()
a, b = reader.GetOutput().GetPointData().GetArray(0).GetRange()
mapper.SetScalarRange(a, b)
#mapper.ScalarVisibilityOn()
mapper.SetInputConnection(reader.GetOutputPort())
#mapper.SetInputConnection(imageDataGeometryFilter.GetOutputPort())

actor = vtk.vtkActor()
actor.SetMapper(mapper)
#context = actor.GetProperty()
#context.SetRepresentationToWireframe()

renderer = vtk.vtkRenderer()
renderer.AddActor(actor)
renderer.SetBackground(0,0,0)
renderer.ResetCamera()

renwin = vtk.vtkRenderWindow()
renwin.AddRenderer(renderer)
renwin.SetSize(800,800)

iren = vtk.vtkRenderWindowInteractor()
iren.SetRenderWindow(renwin)
iren.Initialize()
renwin.Render()
iren.Start()
raw_input("bla")


