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
reader.GetOutput().SetOrigin(0,0,-178)
#reader.GetOutput().SetOrigin(0,0,-178)
#reader.GetOutput().SetDimensions(176,101,1)
#reader.GetOutput().AllocateScalars(vtk.VTK_DOUBLE, 1)

labSlabReader = vtk.vtkXMLImageDataReader()
labSlabReader.SetFileName("labslab.vti")
labSlabReader.Update()
labSlabArray = labSlabReader.GetOutput().GetPointData().GetArray(0)
labSlabReader.GetOutput().GetPointData().SetScalars(labSlabArray)

mohoReader = vtk.vtkXMLImageDataReader()
mohoReader.SetFileName("moho.vti")
mohoReader.Update()
mohoArray = mohoReader.GetOutput().GetPointData().GetArray(0)
mohoReader.GetOutput().GetPointData().SetScalars(mohoArray)

icdReader = vtk.vtkXMLImageDataReader()
icdReader.SetFileName("icd.vti")
icdReader.Update()
icdArray = icdReader.GetOutput().GetPointData().GetArray(0)
icdReader.GetOutput().GetPointData().SetScalars(icdArray)

topoReader = vtk.vtkXMLImageDataReader()
topoReader.SetFileName("topo.vti")
topoReader.Update()
topoArray = topoReader.GetOutput().GetPointData().GetArray(0)
topoReader.GetOutput().GetPointData().SetScalars(topoArray)

#imageDataGeometryFilter = vtk.vtkImageDataGeometryFilter()
#imageDataGeometryFilter.SetInputConnection(reader.GetOutputPort())
#imageDataGeometryFilter.Update()

labSlabTriangles = vtk.vtkDataSetTriangleFilter()
labSlabTriangles.SetInputConnection(labSlabReader.GetOutputPort())
labSlabTriangles.Update()

mohoTriangles = vtk.vtkDataSetTriangleFilter()
mohoTriangles.SetInputConnection(mohoReader.GetOutputPort())
mohoTriangles.Update()

icdTriangles = vtk.vtkDataSetTriangleFilter()
icdTriangles.SetInputConnection(icdReader.GetOutputPort())
icdTriangles.Update()

topoTriangles = vtk.vtkDataSetTriangleFilter()
topoTriangles.SetInputConnection(topoReader.GetOutputPort())
topoTriangles.Update()

labSlabWarp = vtk.vtkWarpScalar()
labSlabWarp.SetInputConnection(labSlabTriangles.GetOutputPort())
labSlabWarp.Update()
print labSlabWarp.GetOutput().GetBounds()

mohoWarp = vtk.vtkWarpScalar()
mohoWarp.SetInputConnection(mohoTriangles.GetOutputPort())
mohoWarp.Update()

icdWarp = vtk.vtkWarpScalar()
icdWarp.SetInputConnection(icdTriangles.GetOutputPort())
icdWarp.Update()

topoWarp = vtk.vtkWarpScalar()
topoWarp.SetInputConnection(topoTriangles.GetOutputPort())
topoWarp.Update()

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
#nifdagnjafkdgnjdfsz;p
labSlabMapper = vtk.vtkDataSetMapper()
labSlabMapper.SetInputConnection(labSlabWarp.GetOutputPort())
labSlabMapper.ScalarVisibilityOff()

mohoMapper = vtk.vtkDataSetMapper()
mohoMapper.SetInputConnection(mohoWarp.GetOutputPort())
mohoMapper.ScalarVisibilityOff()

icdMapper = vtk.vtkDataSetMapper()
icdMapper.SetInputConnection(icdWarp.GetOutputPort())
icdMapper.ScalarVisibilityOff()

topoMapper = vtk.vtkDataSetMapper()
topoMapper.SetInputConnection(topoWarp.GetOutputPort())
topoMapper.ScalarVisibilityOff()

sliceMapper = vtk.vtkDataSetMapper()
a, b = reader.GetOutput().GetPointData().GetArray(0).GetRange()
sliceMapper.SetScalarRange(a, b)
sliceMapper.SetInputConnection(cutter.GetOutputPort())

actor = vtk.vtkActor()
actor.SetMapper(mapper)
actor.VisibilityOff()
#context = actor.GetProperty()
#context.SetRepresentationToWireframe()

labSlabActor = vtk.vtkActor()
labSlabActor.SetMapper(labSlabMapper)
labSlabContext = labSlabActor.GetProperty()
labSlabContext.SetDiffuseColor(1, 0, 0)

mohoActor = vtk.vtkActor()
mohoActor.SetMapper(mohoMapper)
mohoContext = mohoActor.GetProperty()
mohoContext.SetDiffuseColor(0, 1, 0)

icdActor = vtk.vtkActor()
icdActor.SetMapper(icdMapper)
icdContext = icdActor.GetProperty()
icdContext.SetDiffuseColor(0, 0, 1)

topoActor = vtk.vtkActor()
topoActor.SetMapper(topoMapper)
topoContext = topoActor.GetProperty()
topoContext.SetDiffuseColor(1, 1, 0)

sliceActor = vtk.vtkActor()
sliceActor.SetMapper(sliceMapper)

## Display axes
#transform = vtk.vtkTransform()
#transform.Translate(1.0, 0.0, 0.0)
#axes = vtk.vtkAxesActor
#axes.SetUserTransform(transform)

renderer = vtk.vtkRenderer()
renderer.AddActor(actor)
renderer.AddActor(labSlabActor)
renderer.AddActor(mohoActor)
renderer.AddActor(icdActor)
renderer.AddActor(topoActor)
#renderer.AddActor(axes)
renderer.SetBackground(0,0,0)
#renderer.SetViewport(0,0,0.5,1)
renderer.ResetCamera()

sliceRenderer = vtk.vtkRenderer()
sliceRenderer.AddActor(sliceActor)
sliceRenderer.SetBackground(0,0,0)
sliceRenderer.SetViewport(0.5,0,1,1)
sliceRenderer.ResetCamera()

renwin = vtk.vtkRenderWindow()
renwin.AddRenderer(renderer)
#renwin.AddRenderer(sliceRenderer)
renwin.SetSize(1600,800)

iren = vtk.vtkRenderWindowInteractor()
iren.SetRenderWindow(renwin)

widget = vtk.vtkImplicitPlaneWidget()
print cutter.GetOutput().GetBounds()
widget.PlaceWidget(cutter.GetOutput().GetBounds())
widget.SetOrigin([plane.GetOrigin()[x] for x in 0,1,2])
widget.SetNormal([plane.GetNormal()[x] for x in 0,1,2])

widget.SetInteractor(iren)

def eventhandler(obj,event):
    global plane
    obj.GetPlane(plane)
widget.AddObserver("InteractionEvent", eventhandler)

widget.SetEnabled(0)
#widget.DrawPlaneOn()
#widget.TubingOn()

iren.Initialize()
renwin.Render()
iren.Start()
