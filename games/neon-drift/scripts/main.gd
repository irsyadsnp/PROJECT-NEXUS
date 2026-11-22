extends Node2D

const PLAYER_SCENE := preload("res://scenes/player.tscn")
const SPAWN_POINT := Vector2(110, 520)

var player: CharacterBody2D
var deaths := 0
var finished := false
var status_label: Label
var overlay: ColorRect
var overlay_label: Label

func _ready() -> void:
	_build_level()
	_build_hud()
	player = PLAYER_SCENE.instantiate()
	add_child(player)
	player.global_position = SPAWN_POINT
	player.died.connect(_on_player_died)

func _physics_process(_delta: float) -> void:
	if Input.is_action_just_pressed("restart"):
		if finished:
			get_tree().reload_current_scene()
		else:
			_respawn()

func _build_level() -> void:
	_add_platform(Vector2(640, 690), Vector2(1280, 60))
	_add_platform(Vector2(330, 565), Vector2(210, 24))
	_add_platform(Vector2(650, 465), Vector2(190, 24))
	_add_platform(Vector2(940, 360), Vector2(210, 24))
	_add_platform(Vector2(1150, 265), Vector2(190, 24))
	_add_hazard(Vector2(490, 650), Vector2(90, 22))
	_add_hazard(Vector2(790, 650), Vector2(100, 22))
	_add_hazard(Vector2(1050, 650), Vector2(110, 22))
	_add_goal(Vector2(1190, 205))

func _add_platform(at: Vector2, dimensions: Vector2) -> void:
	var body := StaticBody2D.new()
	body.position = at
	var shape := RectangleShape2D.new()
	shape.size = dimensions
	var collision := CollisionShape2D.new()
	collision.shape = shape
	body.add_child(collision)
	var visual := Polygon2D.new()
	visual.polygon = PackedVector2Array([
		Vector2(-dimensions.x / 2, -dimensions.y / 2),
		Vector2(dimensions.x / 2, -dimensions.y / 2),
		Vector2(dimensions.x / 2, dimensions.y / 2),
		Vector2(-dimensions.x / 2, dimensions.y / 2)
	])
	visual.color = Color(0.12, 0.19, 0.34)
	body.add_child(visual)
	add_child(body)

func _add_hazard(at: Vector2, dimensions: Vector2) -> void:
	var area := Area2D.new()
	area.position = at
	var shape := RectangleShape2D.new()
	shape.size = dimensions
	var collision := CollisionShape2D.new()
	collision.shape = shape
	area.add_child(collision)
	var visual := Polygon2D.new()
	visual.polygon = PackedVector2Array([
		Vector2(-dimensions.x / 2, -dimensions.y / 2),
		Vector2(dimensions.x / 2, -dimensions.y / 2),
		Vector2(dimensions.x / 2, dimensions.y / 2),
		Vector2(-dimensions.x / 2, dimensions.y / 2)
	])
	visual.color = Color(1.0, 0.18, 0.38)
	area.add_child(visual)
	area.body_entered.connect(_on_hazard_touched)
	add_child(area)

func _add_goal(at: Vector2) -> void:
	var area := Area2D.new()
	area.position = at
	var shape := RectangleShape2D.new()
	shape.size = Vector2(52, 90)
	var collision := CollisionShape2D.new()
	collision.shape = shape
	area.add_child(collision)
	var visual := Polygon2D.new()
	visual.polygon = PackedVector2Array([
		Vector2(-20, -40), Vector2(20, -40),
		Vector2(20, 40), Vector2(-20, 40)
	])
	visual.color = Color(0.95, 0.85, 0.25)
	area.add_child(visual)
	area.body_entered.connect(_on_goal_reached)
	add_child(area)

func _build_hud() -> void:
	var layer := CanvasLayer.new()
	add_child(layer)
	status_label = Label.new()
	status_label.position = Vector2(28, 22)
	status_label.add_theme_font_size_override("font_size", 22)
	status_label.add_theme_color_override("font_color", Color(0.78, 0.94, 1))
	status_label.text = "NEON DRIFT   •   DEATHS: 0"
	layer.add_child(status_label)
	var help := Label.new()
	help.position = Vector2(28, 58)
	help.text = "A / D or ← / →  Move     SPACE / W / ↑  Jump     R  Restart"
	help.add_theme_color_override("font_color", Color(0.65, 0.72, 0.86))
	layer.add_child(help)
	overlay = ColorRect.new()
	overlay.color = Color(0.01, 0.02, 0.06, 0.88)
	overlay.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	overlay.visible = false
	layer.add_child(overlay)
	overlay_label = Label.new()
	overlay_label.set_anchors_and_offsets_preset(Control.PRESET_CENTER)
	overlay_label.position = Vector2(-190, -45)
	overlay_label.size = Vector2(380, 90)
	overlay_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	overlay_label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	overlay_label.add_theme_font_size_override("font_size", 30)
	overlay_label.add_theme_color_override("font_color", Color(0.35, 1, 0.85))
	overlay.add_child(overlay_label)

func _on_hazard_touched(body: Node2D) -> void:
	if body == player and not finished:
		_respawn()

func _on_player_died() -> void:
	_respawn()

func _respawn() -> void:
	if finished or not is_instance_valid(player):
		return
	deaths += 1
	player.reset_to(SPAWN_POINT)
	status_label.text = "NEON DRIFT   •   DEATHS: %d" % deaths

func _on_goal_reached(body: Node2D) -> void:
	if body != player or finished:
		return
	finished = true
	player.freeze()
	overlay_label.text = "LEVEL COMPLETE\nPress R to play again"
	overlay.visible = true
