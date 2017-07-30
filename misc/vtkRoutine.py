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
print reader.GetOutput().GetBounds()
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

plane = vtk.vtkPlane()
plane.SetOrigin(50,50,50)
plane.SetNormal(0,0,1)

cutter = vtk.vtkCutter()
cutter.SetCutFunction(plane)
cutter.SetInputConnection(reader.GetOutputPort())
cutter.Update()

mapper = vtk.vtkDataSetMapper()
#mapper = vtk.vtkPolyDataMapper()
a, b = reader.GetOutput().GetPointData().GetArray(0).GetRange()
mapper.SetScalarRange(a, b)
#mapper.ScalarVisibilityOn()
mapper.SetInputConnection(reader.GetOutputPort())
#mapper.SetInputConnection(imageDataGeometryFilter.GetOutputPort())

sliceMapper = vtk.vtkDataSetMapper()
a, b = reader.GetOutput().GetPointData().GetArray(0).GetRange()
sliceMapper.SetScalarRange(a, b)
sliceMapper.SetInputConnection(cutter.GetOutputPort())

actor = vtk.vtkActor()
actor.SetMapper(mapper)
#context = actor.GetProperty()
#context.SetRepresentationToWireframe()

sliceActor = vtk.vtkActor()
sliceActor.SetMapper(sliceMapper)

renderer = vtk.vtkRenderer()
renderer.AddActor(actor)
renderer.SetBackground(0,0,0)
renderer.ResetCamera()

sliceRenderer = vtk.vtkRenderer()
sliceRenderer.AddActor(sliceActor)
sliceRenderer.SetBackground(0,0,0)
sliceRenderer.ResetCamera()

sliceRenwin = vtk.vtkRenderWindow()
sliceRenwin.AddRenderer(sliceRenderer)
sliceRenwin.SetSize(800,800)

renwin = vtk.vtkRenderWindow()
renwin.AddRenderer(renderer)
renwin.SetSize(800,800)

iren = vtk.vtkRenderWindowInteractor()
iren.SetRenderWindow(renwin)

widget = vtk.vtkImplicitPlaneWidget()
widget.PlaceWidget(cutter.GetOutput().GetBounds())
widget.SetOrigin(plane.GetOrigin())
widget.SetNormal(plane.GetNormal())

widget.SetInteractor(iren)

def eventhandler(obj,event):
    global plane
    obj.GetPlane(plane)
widget.AddObserver("InteractionEvent", eventhandler)

widget.SetEnabled(1)
widget.DrawPlaneOn()
widget.TubingOn()

iren.Initialize()
renwin.Render()
sliceRenwin.Render()
iren.Start()
